import type {PlayerEventsTimeUpdateInterface, PlayerEventsFirstStartInterface} from './types';
import {BasePlayerError} from '../errors';

export enum PlayerEventNames {
  PlayError = 'Player:PlayError',
  Load = 'Player:Load',
  LoadStart = 'Player:LoadStart',
  Waiting = 'Player:Waiting',
  CanPlay = 'Player:CanPlay',
  CanPlayThrough = 'Player:CanPlayThrough',
  Playing = 'Player:Playing',
  Buffered = 'Player:Buffered',
  Ended = 'Player:Ended',
  FirstStart = 'Player:FirstStart',
  Seeking = 'Player:Seeking',
  Seeked = 'Player:Seeked',
  Play = 'Player:Play',
  Pause = 'Player:Pause',
  Progress = 'Player:Progress',
  DurationChange = 'Player:DurationChange',
  Error = 'Player:Error',
  Suspend = 'Player:Suspend',
  Abort = 'Player:Abort',
  Emptied = 'Player:Emptied',
  Stalled = 'Player:Stalled',
  LoadedMetadata = 'Player:LoadedMetadata',
  LoadedData = 'Player:LoadedData',
  TimeUpdate = 'Player:TimeUpdate',
  RateChange = 'Player:RateChange',
  VolumeChange = 'Player:VolumeChange',
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
