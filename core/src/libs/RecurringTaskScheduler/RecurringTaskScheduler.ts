import {TimeoutType} from '../../types';

interface RecurringTaskSchedulerOptions {
  /**
   * The callback function to be executed at each interval.
   */
  callback: () => void;
  /**
   * The duration of the interval in milliseconds.
   */
  duration: number;
  /**
   * If true, the callback will be executed before the interval starts.
   */
  enablePreStartCommit?: boolean;
  /**
   * If true, the callback will be executed before the interval ends.
   */
  enablePreEndCommit?: boolean;
}

export class RecurringTaskScheduler {
  private interval!: TimeoutType;

  private readonly duration!: number;
  private readonly enablePreStartCommit!: boolean;
  private readonly enablePreEndCommit!: boolean;
  private readonly callback!: () => void;

  /**
   * Creates a new instance of LoopInterval.
   * @param options - Options for configuring the behavior of the loop interval.
   */
  constructor(options: RecurringTaskSchedulerOptions) {
    const {duration, callback, enablePreEndCommit = false, enablePreStartCommit = false} = options;

    this.duration = duration;
    this.callback = callback;
    this.enablePreStartCommit = enablePreStartCommit;
    this.enablePreEndCommit = enablePreEndCommit;
  }

  /**
   * Executes the callback immediately without waiting for the interval.
   */
  public commit(): void {
    this.callback();
  }

  /**
   * Restarts the loop interval, executing the callback immediately and setting up a new interval.
   */
  public refresh(): void {
    this.end(true);
    this.start();
  }

  /**
   * Starts the loop interval.
   * @param ignorePreStartCommit - If true, skips executing the callback before starting the interval.
   */
  public start(ignorePreStartCommit: boolean = false): void {
    if (!ignorePreStartCommit && this.enablePreStartCommit) {
      this.commit();
    }

    this.end(true);
    this.interval = setInterval(() => this.commit(), this.duration);
  }

  /**
   * Ends the loop interval.
   * @param ignorePreEndCommit - If true, skips executing the callback before ending the interval.
   */
  public end(ignorePreEndCommit: boolean = false): void {
    if (!this.interval) {
      return;
    }

    if (!ignorePreEndCommit && this.enablePreEndCommit) {
      this.commit();
    }

    clearInterval(this.interval);
  }
}
