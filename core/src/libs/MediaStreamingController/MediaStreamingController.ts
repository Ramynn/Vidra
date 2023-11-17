import {RecurringTaskScheduler} from '../RecurringTaskScheduler';
import {TimeSpanTracker} from '../TimeSpanTracker';
import {ElapsedTimeTracker} from '../ElapsedTimeTracker';
import {EventEmitter} from '../EventEmitter';
import {
  PlayerEvents,
  PlayerEventsMap,
  PlayerEventsFirstStartInterface,
  PlayerEventsTimeUpdateInterface,
  MediaStreamingControllerEvents,
  MediaStreamingControllerEventsMap,
} from '../../events';
import {AdapterMethodNotImplementedError, BasePlayerError, PlayerNotInitializedError} from '../../errors';
import {enabledFullscreen, exitFullscreen, isFullscreen, requestFullscreen, isDefined, retry} from '../../helpers';

import {
  InternalStates,
  InternalMeasurements,
  MediaStreamingControllerInfoInterface,
  ClientLogger,
  InternalScheduler,
  StreamingLevels,
  StreamingLevel,
} from './types';

export abstract class MediaStreamingController extends EventEmitter<
  MediaStreamingControllerEventsMap & PlayerEventsMap
> {
  protected logger: ClientLogger | undefined;

  protected readonly states!: InternalStates;
  protected readonly scheduler!: InternalScheduler;
  protected readonly timeTracker!: InternalMeasurements;

  protected constructor() {
    super();

    this.states = {
      played: new TimeSpanTracker(),
      media: null,
      currentTime: 0,
      currentSource: null,
      isStarted: false,
    };

    this.scheduler = {
      timeUpdate: new RecurringTaskScheduler({
        callback: (): void => this.handleTimeUpdate(),
        duration: 1000,
        enablePreEndCommit: true,
        enablePreStartCommit: true,
      }),
    };

    this.timeTracker = {
      firstLoading: new ElapsedTimeTracker(),
      waitingTimes: new ElapsedTimeTracker(),
    };

    this.on(MediaStreamingControllerEvents.MediaAttached, (event) => {
      this.states.media = event.data.media;
    });

    this.on(MediaStreamingControllerEvents.MediaDetached, () => {
      this.states.media = null;
    });

    this.on(MediaStreamingControllerEvents.ManifestLoading, (event) => {
      this.states.currentSource = event.data.url;
    });

    this.once(PlayerEvents.LoadStart, () => {
      this.timeTracker.firstLoading.start();
    });

    this.once(PlayerEvents.CanPlayThrough, () => {
      this.timeTracker.firstLoading.end();
      this.states.isStarted = true;

      const target: PlayerEventsFirstStartInterface = {
        loadingTime: this.timeTracker.firstLoading.getDuration(),
        level: this.getCurrentLevel()!,
      };

      this.emit(PlayerEvents.FirstStart, target);
    });

    this.on(MediaStreamingControllerEvents.Error, (event) => {
      if (event.data.isFatal) {
        this.timeTracker.firstLoading.end();
        this.timeTracker.waitingTimes.end();
      }
    });
  }

  get isInitialized(): boolean {
    return this.states.media !== null;
  }

  get currentSource(): string | null {
    return this.states.currentSource;
  }

  get media(): HTMLMediaElement {
    if (!this.isInitialized) {
      const error = new PlayerNotInitializedError();

      this.emit(PlayerEvents.Error, error);

      throw error;
    }

    return this.states.media!;
  }

  static info(): MediaStreamingControllerInfoInterface {
    throw new AdapterMethodNotImplementedError(this.info(), 'info');
  }

  static isSupported(): boolean {
    throw new AdapterMethodNotImplementedError(this.info(), 'isSupported');
  }

  static getLevelLabel(options: Partial<StreamingLevel>): string {
    let label: string = '';

    if (options.height) {
      label += `${options.height}p`;
    } else if (options.width) {
      label += `${Math.round((options.width * 9) / 16)}p`;
    } else if (options.bitrate) {
      label += `${Math.ceil(options.bitrate / 1000)}kbps`;
    }

    if (options.frameRate && options.frameRate > 30) {
      label += ` ${options.frameRate}fps`;
    }

    if (options.isSource) {
      label += ' (Source)';
    }

    return label;
  }

  public getConstructor<ConstructorType = typeof MediaStreamingController>(): ConstructorType {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.constructor as any;
  }

  public updateLogger(logger: ClientLogger | undefined): void {
    this.logger = logger;
  }

  public onLoad(): void {
    this.logMethodCall('onLoad');
    this.emit(PlayerEvents.Load);
  }

  public onLoadStart(): void {
    this.logMethodCall('onLoadStart');
    this.emit(PlayerEvents.LoadStart);
  }

  public onWaiting(): void {
    this.scheduler.timeUpdate.end();
    this.timeTracker.waitingTimes.start();

    this.logMethodCall('onWaiting');
    this.emit(PlayerEvents.Waiting);
  }

  public onCanPlay(): void {
    this.handleTimeUpdate();

    this.logMethodCall('onCanPlay');
    this.emit(PlayerEvents.CanPlay);
  }

  public onCanPlayThrough(): void {
    this.handleTimeUpdate();

    this.timeTracker.waitingTimes.end();

    this.logMethodCall('onCanPlayThrough');
    this.emit(PlayerEvents.CanPlayThrough);
  }

  public onPlaying(): void {
    this.states.played.start(this.media.currentTime);
    this.scheduler.timeUpdate.refresh();

    this.logMethodCall('onPlaying');
    this.emit(PlayerEvents.Playing);
  }

  public onEnded(): void {
    this.scheduler.timeUpdate.end();

    this.logMethodCall('onEnded');
    this.emit(PlayerEvents.Ended);
  }

  public onSeeking(): void {
    if (this.media.paused) {
      this.timeTracker.waitingTimes.start(true);
    }

    this.logMethodCall('onSeeking');
    this.emit(PlayerEvents.Seeking);
  }

  public onSeeked(): void {
    this.handleTimeUpdate();

    this.logMethodCall('onSeeked');
    this.emit(PlayerEvents.Seeked);
  }

  public onPlay(): void {
    this.scheduler.timeUpdate.start();

    this.logMethodCall('onPlay');
    this.emit(PlayerEvents.Play);
  }

  public onPause(): void {
    this.scheduler.timeUpdate.end();
    this.states.played.end(this.media.currentTime);

    this.logMethodCall('onPause');
    this.emit(PlayerEvents.Pause);
  }

  public onProgress(): void {
    // this.logMethodCall('onProgress');
    this.emit(PlayerEvents.Progress);
  }

  public onDurationChange(): void {
    this.logMethodCall('onDurationChange');
    this.emit(PlayerEvents.DurationChange);
  }

  public onError(): void {
    this.logMethodCall('onError');
    this.emit(PlayerEvents.Error);
  }

  public onSuspend(): void {
    this.logMethodCall('onSuspend');
    this.emit(PlayerEvents.Suspend);
  }

  public onAbort(): void {
    this.logMethodCall('onAbort');
    this.emit(PlayerEvents.Abort);
  }

  public onEmptied(): void {
    this.logMethodCall('onEmptied');
    this.emit(PlayerEvents.Emptied);
  }

  public onStalled(): void {
    this.logMethodCall('onStalled');
    this.emit(PlayerEvents.Stalled);
  }

  public onLoadedMetadata(): void {
    this.logMethodCall('onLoadedMetadata');
    this.emit(PlayerEvents.LoadedMetadata);
  }

  public onLoadedData(): void {
    this.logMethodCall('onLoadedData');
    this.emit(PlayerEvents.LoadedData);
  }

  public onTimeUpdate(): void {
    this.logMethodCall('onTimeUpdate');
  }

  public onRateChange(): void {
    this.logMethodCall('onRateChange');
    this.emit(PlayerEvents.RateChange);
  }

  public onVolumeChange(): void {
    this.logMethodCall('onVolumeChange');
    this.emit(PlayerEvents.VolumeChange);
  }

  public onPlayError(error: BasePlayerError): void {
    this.logMethodCall('onPlayError', error);

    if (error instanceof PlayerNotInitializedError) {
      return;
    }

    this.emit(PlayerEvents.PlayError, error);
  }

  public async play(): Promise<void> {
    this.logMethodCall('play');

    try {
      await retry(() => this.media.play(), 10);
    } catch (error) {
      this.onPlayError(error as BasePlayerError);

      throw error;
    }
  }

  public pause(): void {
    this.logMethodCall('pause');
    this.media.pause();
  }

  public load(): void {
    this.logMethodCall('load');
    this.media.pause();

    this.emit(PlayerEvents.Load);
  }

  public requestFullScreen(element: HTMLElement | null): void {
    if (!enabledFullscreen()) {
      return;
    }

    if (!isFullscreen()) {
      requestFullscreen(element ?? this.media);
    }
  }

  public exitFullScreen(): void {
    if (!enabledFullscreen()) {
      return;
    }

    exitFullscreen();
  }

  public requestPictureInPicture(): Promise<PictureInPictureWindow> {
    return (this.media as HTMLVideoElement).requestPictureInPicture();
  }

  public exitPictureInPicture(): void | Promise<void> {
    if (document.pictureInPictureElement) {
      return document.exitPictureInPicture();
    }

    return;
  }

  public togglePlay(): void {
    this.logMethodCall('togglePlay');

    if (this.media.paused) {
      void this.play();
    } else {
      this.pause();
    }
  }

  public seek(time: number): void {
    this.logMethodCall('seek', time);
    this.media.currentTime = time;
  }

  public forward(seconds: number): void {
    this.logMethodCall('forward', seconds);
    this.seek(this.media.currentTime + seconds);
  }

  public replay(seconds: number): void {
    this.logMethodCall('replay', seconds);
    this.seek(this.media.currentTime - seconds);
  }

  protected cleanInternalState(): void {
    this.states.media = null;
    this.states.currentTime = 0;
    this.states.currentSource = null;
    this.states.isStarted = false;

    this.states.played.reset();
    this.scheduler.timeUpdate.end(true);
    this.timeTracker.firstLoading.reset();
    this.timeTracker.waitingTimes.reset();
  }

  protected logMethodCall(method: string, ...args: unknown[]): void {
    this.logger?.debug(`Method: ${method}`, {method, args});
  }

  private handleTimeUpdate(): void {
    const newCurrentTime = this.media.currentTime;

    if (newCurrentTime === this.states.currentTime) {
      return;
    }

    this.states.currentTime = newCurrentTime;

    const {duration, played} = this.media;

    let secondsPlayed: number = 0;
    let percentPlayed: number = 0;

    if (duration > 0 && isDefined(played)) {
      for (let i = 0; i < played.length; i++) {
        secondsPlayed = secondsPlayed + (played.end(i) - played.start(i));
      }

      percentPlayed = (100 / duration) * secondsPlayed;
    }

    const data: PlayerEventsTimeUpdateInterface = {
      currentTime: this.states.currentTime,
      liveTime: 0,
      latency: 0,
      percentPlayed,
      secondsPlayed,
      secondsPlayed2: this.states.played.getTotalTime(),
      waitingDuration: this.timeTracker.waitingTimes.getDuration() / 1000,
    };

    this.emit(PlayerEvents.TimeUpdate, data);
  }

  abstract connectMedia(media: HTMLMediaElement): void;

  abstract recoverMediaError(): void;

  abstract swapAudioCodec(): void;

  abstract loadSource(url: string): void;

  abstract startLoadSource(): void;

  abstract stopLoadSource(): void;

  abstract disconnect(): void;

  abstract destroy(): void;

  abstract getCurrentLevelIndex(): number;

  abstract getLevels(): StreamingLevels;

  abstract getLevel(index: number): StreamingLevel | undefined;

  abstract getCurrentLevel(): StreamingLevel | undefined;

  abstract setNextLevel(index: number | null): void;

  abstract setCurrentLevel(index: number | null): void;

  abstract setStartLevel(index: number | null): void;

  abstract getLiveSyncDurationCount(): number;

  abstract getIsLive(): boolean;
}
