export interface StreamingBackendInfoInterface {
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
