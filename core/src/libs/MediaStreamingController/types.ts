import {TimeSpanTracker} from '../TimeSpanTracker';
import {RecurringTaskScheduler} from '../RecurringTaskScheduler';
import {ElapsedTimeTracker} from '../ElapsedTimeTracker';

export interface InternalStates {
  currentTime: number;
  played: TimeSpanTracker;
  media: HTMLMediaElement | null;
  currentSource: string | null;
  isStarted: boolean;
}

export interface InternalScheduler {
  timeUpdate: RecurringTaskScheduler;
}

export interface InternalMeasurements {
  firstLoading: ElapsedTimeTracker;
  waitingTimes: ElapsedTimeTracker;
}

export type ClientLogger = typeof console;

export interface MediaStreamingControllerInfo {
  name: string;
  version: string;
}

export interface StreamingLevel {
  bitrate: number;
  width?: number;
  height?: number;
  frameRate?: number;
  index: number;
  targetDuration?: number;
  label: string;
  isSource: boolean;
}

export type StreamingLevels = StreamingLevel[];
