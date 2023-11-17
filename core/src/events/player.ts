import type {PlayerEventsTimeUpdateInterface, PlayerEventsFirstStartInterface} from './types';
import {BasePlayerError} from '../errors';

export enum PlayerEventNames {
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

export interface PlayerEvents {
  [PlayerEventNames.PlayError]: BasePlayerError;
  [PlayerEventNames.Load]: never;
  [PlayerEventNames.LoadStart]: never;
  [PlayerEventNames.Waiting]: never;
  [PlayerEventNames.CanPlay]: never;
  [PlayerEventNames.CanPlayThrough]: never;
  [PlayerEventNames.Playing]: never;
  [PlayerEventNames.Ended]: never;
  [PlayerEventNames.FirstStart]: PlayerEventsFirstStartInterface;
  [PlayerEventNames.Seeking]: never;
  [PlayerEventNames.Seeked]: never;
  [PlayerEventNames.Play]: never;
  [PlayerEventNames.Pause]: never;
  [PlayerEventNames.Progress]: never;
  [PlayerEventNames.DurationChange]: never;
  [PlayerEventNames.Error]: BasePlayerError;
  [PlayerEventNames.Suspend]: never;
  [PlayerEventNames.Abort]: never;
  [PlayerEventNames.Emptied]: never;
  [PlayerEventNames.Stalled]: never;
  [PlayerEventNames.LoadedMetadata]: never;
  [PlayerEventNames.LoadedData]: never;
  [PlayerEventNames.TimeUpdate]: PlayerEventsTimeUpdateInterface;
  [PlayerEventNames.RateChange]: never;
  [PlayerEventNames.VolumeChange]: never;
}
