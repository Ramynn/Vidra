import {isDefined} from '../../helpers';

type Range = [number, number?];
type Ranges = Range[];

/**
 * A utility class for calculating and managing time ranges.
 */
export class TimeSpanTracker {
  private ranges: Ranges = [];

  /**
   * Get the valid time ranges, excluding incomplete ranges.
   * @returns An array of valid time ranges.
   */
  public getRanges(): Ranges {
    return this.ranges.filter(([start, end]) => isDefined(start) && isDefined(end));
  }

  /**
   * Get the number of valid time ranges.
   * @returns The number of valid time ranges.
   */
  public getLength(): number {
    return this.getRanges().length;
  }

  /**
   * Get the total duration of all valid time ranges.
   * @returns The total duration of all valid time ranges.
   */
  public getTotalTime(): number {
    let duration = 0;
    const filledRanges = this.getRanges();

    for (const [start, end] of filledRanges) {
      duration += (end ?? 0) - start;
    }

    return duration;
  }

  /**
   * Start a new time range.
   * @param time - The start time of the range.
   */
  public start(time: number): void {
    this.ranges.push([time, undefined]);
  }

  /**
   * End the last started time range.
   * @param time - The end time of the range.
   */
  public end(time: number): void {
    if (this.ranges.length === 0 || this.ranges.at(-1)?.[1] !== undefined) {
      // Ignore if no ranges started or the last range is already ended
      return;
    }

    this.ranges.at(-1)![1] = time;
  }

  /**
   * Reset the time ranges, removing all recorded ranges.
   */
  public reset(): void {
    this.ranges = [];
  }
}
