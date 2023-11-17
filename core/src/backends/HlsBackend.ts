import type {ErrorData, Level as HlsLevel, Level} from 'hls.js';
import Hls, {ErrorDetails, ErrorTypes, Events as HlsEvents} from 'hls.js';
import type {MediaStreamingControllerInfo, StreamingLevel, StreamingLevels} from '../libs';
import {
  MediaStreamingControllerEvents,
  StreamingEventsLevelSwitchedInterface,
  StreamingEventsLevelLoadedInterface,
  StreamingEventsManifestLoadingInterface,
  StreamingEventsManifestParsedInterface,
  StreamingEventsLevelSwitchingInterface,
  StreamingEventsMediaAttachedInterface,
} from '../events';
import {
  BasePlayerAdapterError,
  AdapterAudioTrackLoadError,
  AdapterAudioTrackLoadTimeoutError,
  AdapterBaseMediaError,
  AdapterBaseNetworkError,
  AdapterBufferAddCodecError,
  AdapterBufferAppendError,
  AdapterBufferAppendingError,
  AdapterBufferFullError,
  AdapterBufferIncompatibleCodecsError,
  AdapterBufferNudgeOnStallError,
  AdapterBufferNudgeStalledError,
  AdapterBufferSeekOverHoleError,
  AdapterFragDecryptError,
  AdapterFragLoadError,
  AdapterFragLoadTimeoutError,
  AdapterFragParseError,
  AdapterInternalError,
  AdapterKeyLoadError,
  AdapterKeyLoadTimeoutError,
  AdapterKeySystemLicenceRequestFailedError,
  AdapterKeySystemNoAccessError,
  AdapterKeySystemNoKeysError,
  AdapterKeySystemNoSessionError,
  AdapterKeyUnknownError,
  AdapterLevelEmptyError,
  AdapterLevelLoadError,
  AdapterLevelLoadTimeoutError,
  AdapterLevelSwitchError,
  AdapterManifestIncompatibleCodecsError,
  AdapterManifestLoadError,
  AdapterManifestLoadTimeoutError,
  AdapterManifestParsingError,
  AdapterMuxAllocationError,
  AdapterUnknownMediaError,
  AdapterUnknownMuxError,
  AdapterUnknownNetworkError,
} from '../errors';
import {MediaStreamingController} from '../libs';
import {isDefined} from '../helpers';
import {sortObjectArray} from '../helpers/arrayHelpers';

export class HlsBackend extends MediaStreamingController {
  private hls!: Hls;
  private recoverDecodingErrorDate: number | null = null;
  private recoverSwapAudioCodecDate: number | null = null;

  constructor() {
    super();

    this.hls = new Hls({
      debug: false,
      liveSyncDurationCount: 3,
    });

    this.initEventListeners();
  }

  static convertHlsError(error: ErrorData): BasePlayerAdapterError {
    const info = HlsBackend.info();
    const isFatal = error.fatal;

    switch (error.type) {
      case ErrorTypes.NETWORK_ERROR: {
        switch (error.details) {
          case ErrorDetails.MANIFEST_LOAD_ERROR: {
            return new AdapterManifestLoadError(info, isFatal);
          }

          case ErrorDetails.MANIFEST_LOAD_TIMEOUT: {
            return new AdapterManifestLoadTimeoutError(info, isFatal);
          }

          case ErrorDetails.MANIFEST_PARSING_ERROR: {
            return new AdapterManifestParsingError(info, isFatal);
          }

          case ErrorDetails.LEVEL_EMPTY_ERROR: {
            return new AdapterLevelEmptyError(info, isFatal);
          }

          case ErrorDetails.LEVEL_LOAD_ERROR: {
            return new AdapterLevelLoadError(info, isFatal);
          }

          case ErrorDetails.LEVEL_LOAD_TIMEOUT: {
            return new AdapterLevelLoadTimeoutError(info, isFatal);
          }

          case ErrorDetails.AUDIO_TRACK_LOAD_ERROR: {
            return new AdapterAudioTrackLoadError(info, isFatal);
          }

          case ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT: {
            return new AdapterAudioTrackLoadTimeoutError(info, isFatal);
          }

          case ErrorDetails.FRAG_LOAD_ERROR: {
            return new AdapterFragLoadError(info, isFatal);
          }

          case ErrorDetails.FRAG_LOAD_TIMEOUT: {
            return new AdapterFragLoadTimeoutError(info, isFatal);
          }

          case ErrorDetails.KEY_LOAD_ERROR: {
            return new AdapterKeyLoadError(info, isFatal);
          }

          case ErrorDetails.KEY_LOAD_TIMEOUT: {
            return new AdapterKeyLoadTimeoutError(info, isFatal);
          }

          default: {
            return new AdapterUnknownNetworkError(info, isFatal);
          }
        }
      }

      case ErrorTypes.KEY_SYSTEM_ERROR: {
        switch (error.details) {
          case ErrorDetails.KEY_SYSTEM_NO_KEYS: {
            return new AdapterKeySystemNoKeysError(info, isFatal);
          }

          case ErrorDetails.KEY_SYSTEM_NO_ACCESS: {
            return new AdapterKeySystemNoAccessError(info, isFatal);
          }

          case ErrorDetails.KEY_SYSTEM_NO_SESSION: {
            return new AdapterKeySystemNoSessionError(info, isFatal);
          }

          case ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED: {
            return new AdapterKeySystemLicenceRequestFailedError(info, isFatal);
          }

          // case ErrorDetails.KEY_SYSTEM_NO_INIT_DATA: {
          //   return new AdapterKeySystemNoInitDataError(info, isFatal);
          // }

          default: {
            return new AdapterKeyUnknownError(info, isFatal);
          }
        }
      }

      case ErrorTypes.MUX_ERROR: {
        switch (error.details) {
          case ErrorDetails.REMUX_ALLOC_ERROR: {
            return new AdapterMuxAllocationError(info, isFatal);
          }

          default: {
            return new AdapterUnknownMuxError(info, isFatal);
          }
        }
      }

      case ErrorTypes.MEDIA_ERROR: {
        switch (error.details) {
          case ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR: {
            return new AdapterManifestIncompatibleCodecsError(info, isFatal);
          }
          case ErrorDetails.FRAG_DECRYPT_ERROR: {
            return new AdapterFragDecryptError(info, isFatal);
          }
          case ErrorDetails.FRAG_PARSING_ERROR: {
            return new AdapterFragParseError(info, isFatal);
          }
          case ErrorDetails.BUFFER_ADD_CODEC_ERROR: {
            return new AdapterBufferAddCodecError(info, isFatal);
          }
          case ErrorDetails.BUFFER_INCOMPATIBLE_CODECS_ERROR: {
            return new AdapterBufferIncompatibleCodecsError(info, isFatal);
          }
          case ErrorDetails.BUFFER_APPEND_ERROR: {
            return new AdapterBufferAppendError(info, isFatal);
          }
          case ErrorDetails.BUFFER_APPENDING_ERROR: {
            return new AdapterBufferAppendingError(info, isFatal);
          }
          case ErrorDetails.BUFFER_STALLED_ERROR: {
            return new AdapterBufferNudgeStalledError(info, isFatal);
          }
          case ErrorDetails.BUFFER_FULL_ERROR: {
            return new AdapterBufferFullError(info, isFatal);
          }
          case ErrorDetails.BUFFER_SEEK_OVER_HOLE: {
            return new AdapterBufferSeekOverHoleError(info, isFatal);
          }
          case ErrorDetails.BUFFER_NUDGE_ON_STALL: {
            return new AdapterBufferNudgeOnStallError(info, isFatal);
          }

          default: {
            return new AdapterUnknownMediaError(info, isFatal);
          }
        }
      }

      case ErrorTypes.OTHER_ERROR: {
        switch (error.details) {
          case ErrorDetails.LEVEL_SWITCH_ERROR: {
            return new AdapterLevelSwitchError(info, isFatal);
          }

          case ErrorDetails.INTERNAL_EXCEPTION:
          default: {
            return new AdapterInternalError(info, isFatal);
          }
        }
      }

      default: {
        return new AdapterInternalError(info, isFatal);
      }
    }
  }

  static transformHlsLevel(level: HlsLevel, index: number, isSource: boolean): StreamingLevel | undefined {
    if (!isDefined(level)) {
      return;
    }

    const frameRate = isDefined(level.attrs['FRAME-RATE']) ? parseInt(level.attrs['FRAME-RATE']) : undefined;
    const label = MediaStreamingController.getLevelLabel({
      bitrate: level.bitrate,
      height: level.height,
      width: level.width,
      frameRate,
      isSource,
    });

    return {
      index,
      label,
      bitrate: level.bitrate,
      height: level.height,
      width: level.width,
      frameRate,
      targetDuration: level.details?.targetduration,
      isSource,
    };
  }

  static transformHlsLevels(levels: Level[]): StreamingLevels {
    return sortObjectArray<any>(
      levels.map((level, index) => {
        return HlsBackend.transformHlsLevel(level, index, levels.length === 1 || index === levels.length - 1);
      }),
      'bitrate',
      true,
    ) as StreamingLevels;
  }

  static info(): MediaStreamingControllerInfo {
    return {
      name: 'Hls',
      version: Hls.version,
    };
  }

  static isSupported(): boolean {
    return Hls.isSupported();
  }

  public connectMedia(media: HTMLMediaElement): void {
    this.logMethodCall('connectMedia', media);
    this.states.media = media;

    this.hls.attachMedia(media);
  }

  public disconnect(): void {
    this.logMethodCall('disconnect');

    this.states.media = null;
    this.hls.detachMedia();
  }

  public destroy(): void {
    this.logMethodCall('destroy');

    this.recoverDecodingErrorDate = null;
    this.recoverSwapAudioCodecDate = null;

    this.disconnect();
    this.hls.destroy();
    this.cleanInternalState();
  }

  public loadSource(url: string): void {
    this.logMethodCall('loadSource', url);

    this.hls.loadSource(url);
  }

  public startLoadSource(): void {
    this.logMethodCall('startLoadSource');

    this.hls.startLoad();
  }

  public stopLoadSource(): void {
    this.logMethodCall('stopLoadSource');

    this.hls.stopLoad();
  }

  public recoverMediaError(): void {
    this.logMethodCall('recoverMediaError');

    this.hls.recoverMediaError();
  }

  public swapAudioCodec(): void {
    this.logMethodCall('swapAudioCodec');

    this.hls.swapAudioCodec();
  }

  public getLevels(): StreamingLevels {
    this.logMethodCall('getLevels');

    return HlsBackend.transformHlsLevels(this.hls.levels);
  }

  public getCurrentLevel(): StreamingLevel | undefined {
    return this.getLevel(this.getCurrentLevelIndex());
  }

  public getLevel(index: number): StreamingLevel | undefined {
    return this.getLevels().find((level) => level.index === index);
  }

  public setStartLevel(index: number | null): void {
    this.logMethodCall('setStartLevel', index);

    this.hls.currentLevel = isDefined(index) ? index : -1;
  }

  public getLiveSyncDurationCount(): number {
    return this.hls.config.liveSyncDurationCount;
  }

  public setNextLevel(index: number | null): void {
    this.logMethodCall('setQuality', index);

    this.hls.nextLevel = isDefined(index) ? index : -1;
  }

  public setCurrentLevel(index: number | null): void {
    this.logMethodCall('setQuality', index);

    this.hls.nextLevel = isDefined(index) ? index : -1;
  }

  public getCurrentLevelIndex(): number {
    this.logMethodCall('getCurrentQualityIndex');

    return this.hls.currentLevel;
  }

  public getIsLive(): boolean {
    return this.hls.levels[this.hls.currentLevel]?.details?.live ?? false;
  }

  private initEventListeners(): void {
    this.hls.on(HlsEvents.MANIFEST_LOADING, (event, data) => {
      const target: StreamingEventsManifestLoadingInterface = {
        url: data.url,
      };

      this.emit(MediaStreamingControllerEvents.ManifestLoading, target);
    });

    this.hls.on(HlsEvents.MANIFEST_LOADED, () => {
      this.emit(MediaStreamingControllerEvents.ManifestLoaded);
    });

    this.hls.on(HlsEvents.MEDIA_ATTACHED, (event, data) => {
      const target: StreamingEventsMediaAttachedInterface = {
        media: data.media,
      };

      this.emit(MediaStreamingControllerEvents.MediaAttached, target);
    });

    this.hls.on(HlsEvents.MEDIA_DETACHED, () => {
      this.emit(MediaStreamingControllerEvents.MediaDetached);
    });

    this.hls.on(HlsEvents.MANIFEST_PARSED, () => {
      const target: StreamingEventsManifestParsedInterface = {
        levels: this.getLevels(),
      };

      this.emit(MediaStreamingControllerEvents.ManifestParsed, target);
    });

    this.hls.on(HlsEvents.BUFFER_CREATED, () => {
      this.emit(MediaStreamingControllerEvents.BufferLoaded);
    });

    this.hls.on(HlsEvents.FRAG_PARSED, () => {
      this.emit(MediaStreamingControllerEvents.FragmentParsed);
    });

    this.hls.on(HlsEvents.LEVEL_LOADED, (event, data) => {
      const target: StreamingEventsLevelLoadedInterface = {
        isLive: data.details.live,
        totalDuration: data.details.totalduration,
      };

      this.emit(MediaStreamingControllerEvents.LevelLoaded, target);
    });

    this.hls.on(HlsEvents.LEVEL_SWITCHED, (event, data) => {
      const target: StreamingEventsLevelSwitchedInterface = {
        level: data.level,
      };

      this.emit(MediaStreamingControllerEvents.LevelSwitched, target);
    });

    this.hls.on(HlsEvents.LEVEL_SWITCHING, (event, data) => {
      const target: StreamingEventsLevelSwitchingInterface = {
        level: data.level,
      };

      this.emit(MediaStreamingControllerEvents.LevelSwitching, target);
    });

    this.hls.on(HlsEvents.ERROR, (event, data) => {
      const convertHlsError = HlsBackend.convertHlsError(data);

      this.handleError(convertHlsError);
    });
  }

  private handleError(error: BasePlayerAdapterError): void {
    this.logger?.error('Handling HLS Error', error);

    if (error.isFatal) {
      if (error instanceof AdapterBaseMediaError) {
        this.handleMediaError();

        return;
      }

      if (error instanceof AdapterBaseNetworkError) {
        // this.startLoadSource();

        return;
      }

      this.destroy();

      this.emit(MediaStreamingControllerEvents.Error, error);

      return;
    }

    // handling drop frame by seeking 10s forward
    if (error instanceof AdapterBufferNudgeStalledError) {
      this.media.currentTime += 10;

      void this.play();

      return;
    }

    this.recoverMediaError();

    this.emit(MediaStreamingControllerEvents.Error, error);
  }

  private handleMediaError(): void {
    const now = performance.now();

    if (!this.recoverDecodingErrorDate || now - this.recoverDecodingErrorDate > 3000) {
      this.recoverDecodingErrorDate = performance.now();

      this.recoverMediaError();

      return;
    }

    if (!this.recoverSwapAudioCodecDate || now - this.recoverSwapAudioCodecDate > 3000) {
      this.recoverSwapAudioCodecDate = performance.now();

      this.swapAudioCodec();
      this.recoverMediaError();
    }
  }
}
