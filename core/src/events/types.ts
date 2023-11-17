import {StreamingLevel, StreamingLevels} from '../libs';

export interface StreamingEventsLevelLoadedInterface {
  isLive: boolean;
  totalDuration: number;
}

export interface StreamingEventsMediaAttachedInterface {
  media: HTMLMediaElement;
}

export interface StreamingEventsLevelSwitchingInterface {
  level: number;
}

export interface StreamingEventsLevelSwitchedInterface {
  level: number;
}

export interface StreamingEventsManifestParsedInterface {
  levels: StreamingLevels | undefined;
}

export interface StreamingEventsManifestLoadingInterface {
  url: string;
}

export interface PlayerEventsTimeUpdateInterface {
  currentTime: number;
  secondsPlayed2: number;
  secondsPlayed: number;
  percentPlayed: number;
  waitingDuration: number;
  liveTime?: number;
  latency?: number;
}

export interface PlayerEventsFirstStartInterface {
  loadingTime: number;
  level: StreamingLevel;
}
