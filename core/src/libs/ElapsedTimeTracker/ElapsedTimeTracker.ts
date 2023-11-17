import {isDefined} from '../../helpers';

interface ElapsedTimeTrackerOptions {
  /**
   * If true, the duration measurement will start automatically upon initialization.
   */
  startOnInit?: boolean;
}

/**
 * A utility class for measuring the duration of time intervals.
 */
export class ElapsedTimeTracker {
  /**
   * The timestamp when the current time measurement started.
   */
  private currentStartTime: DOMHighResTimeStamp | null = null;

  /**
   * The accumulated duration of all time intervals measured.
   */
  private durations: number = 0;

  /**
   * Indicates whether the measurement is currently in progress.
   */
  private isStarted: boolean = false;

  /**
   * Creates a new instance of DurationMeasurement.
   * @param options - Options for configuring the behavior of the duration measurement.
   */
  constructor(options?: ElapsedTimeTrackerOptions) {
    if (options?.startOnInit) {
      this.start();
    }
  }

  /**
   * Starts a new time interval measurement. If `restart` is false and a measurement
   * is already in progress, it ends the current measurement before starting a new one.
   * @param restart - If true, starts a new measurement even if the previous one is ongoing.
   */
  public start(restart: boolean = false): void {
    if (!restart && isDefined(this.currentStartTime)) {
      this.end();
    }

    this.currentStartTime = performance.now();
    this.isStarted = true;
  }

  /**
   * Ends the current time interval measurement and accumulates the duration.
   * Does nothing if no measurement is in progress.
   */
  public end(): void {
    if (!isDefined(this.currentStartTime)) {
      return;
    }

    const endTime = performance.now();
    const duration = endTime - this.currentStartTime;

    this.currentStartTime = null;

    this.durations += duration;
    this.isStarted = false;
  }

  /**
   * Gets the total accumulated duration, ending the current measurement if it's in progress.
   * @returns The total duration of all time intervals measured.
   */
  public getDuration(): number {
    if (this.isStarted) {
      this.end();
      this.start();
    }

    return this.durations;
  }

  /**
   * Resets the duration measurement, clearing all accumulated durations and stopping any ongoing measurement.
   */
  public reset(): void {
    this.currentStartTime = null;
    this.isStarted = false;
    this.durations = 0;
  }
}
