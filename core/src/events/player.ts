import type {PlayerEventsTimeUpdateInterface, PlayerEventsFirstStartInterface} from './types';
import {BasePlayerError} from '../errors';

export enum PlayerEvents {
  PlayError = 'PlayError',
  Load = 'Load',
  LoadStart = 'LoadStart',
  Waiting = 'Waiting',
  CanPlay = 'CanPlay',
  CanPlayThrough = 'CanPlayThrough',
  Playing = 'Playing',
  Buffered = 'Buffered',
  Ended = 'Ended',
  FirstStart = 'FirstStart',
  Seeking = 'Seeking',
  Seeked = 'Seeked',
  Play = 'Play',
  Pause = 'Pause',
  Progress = 'Progress',
  DurationChange = 'DurationChange',
  Error = 'Error',
  Suspend = 'Suspend',
  Abort = 'Abort',
  Emptied = 'Emptied',
  Stalled = 'Stalled',
  LoadedMetadata = 'LoadedMetadata',
  LoadedData = 'LoadedData',
  TimeUpdate = 'TimeUpdate',
  RateChange = 'RateChange',
  VolumeChange = 'VolumeChange',
}

export interface PlayerEventsMap {
  [PlayerEvents.PlayError]: BasePlayerError;
  [PlayerEvents.Load]: never;
  [PlayerEvents.LoadStart]: never;
  [PlayerEvents.Waiting]: never;
  [PlayerEvents.CanPlay]: never;
  [PlayerEvents.CanPlayThrough]: never;
  [PlayerEvents.Playing]: never;
  [PlayerEvents.Ended]: never;
  [PlayerEvents.FirstStart]: PlayerEventsFirstStartInterface;
  [PlayerEvents.Seeking]: never;
  [PlayerEvents.Seeked]: never;
  [PlayerEvents.Play]: never;
  [PlayerEvents.Pause]: never;
  [PlayerEvents.Progress]: never;
  [PlayerEvents.DurationChange]: never;
  [PlayerEvents.Error]: BasePlayerError;
  [PlayerEvents.Suspend]: never;
  [PlayerEvents.Abort]: never;
  [PlayerEvents.Emptied]: never;
  [PlayerEvents.Stalled]: never;
  [PlayerEvents.LoadedMetadata]: never;
  [PlayerEvents.LoadedData]: never;
  [PlayerEvents.TimeUpdate]: PlayerEventsTimeUpdateInterface;
  [PlayerEvents.RateChange]: never;
  [PlayerEvents.VolumeChange]: never;
}
