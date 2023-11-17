import type {
  StreamingEventsLevelLoadedInterface,
  StreamingEventsLevelSwitchedInterface,
  StreamingEventsManifestParsedInterface,
  StreamingEventsLevelSwitchingInterface,
  StreamingEventsMediaAttachedInterface,
  StreamingEventsManifestLoadingInterface,
} from './types';

import {BasePlayerAdapterError} from '../errors';

export enum MediaStreamingControllerEvents {
  Error = 'MediaStreamingError',
  ManifestLoading = 'MediaStreamingManifestLoading',
  ManifestLoaded = 'MediaStreamingManifestLoaded',
  ManifestParsed = 'MediaStreamingManifestParsed',
  BufferLoaded = 'MediaStreamingBufferLoaded',
  FragmentParsed = 'MediaStreamingFragmentParsed',
  MediaDetached = 'MediaStreamingMediaDetached',
  MediaAttached = 'MediaStreamingMediaAttached',
  LevelLoaded = 'MediaStreamingLevelLoaded',
  LevelSwitching = 'MediaStreamingLevelSwitching',
  LevelSwitched = 'MediaStreamingLevelSwitched',
}

export interface MediaStreamingControllerEventsMap {
  [MediaStreamingControllerEvents.Error]: BasePlayerAdapterError;
  [MediaStreamingControllerEvents.ManifestLoaded]: never;
  [MediaStreamingControllerEvents.ManifestLoading]: StreamingEventsManifestLoadingInterface;
  [MediaStreamingControllerEvents.ManifestParsed]: StreamingEventsManifestParsedInterface;
  [MediaStreamingControllerEvents.BufferLoaded]: never;
  [MediaStreamingControllerEvents.FragmentParsed]: never;
  [MediaStreamingControllerEvents.MediaAttached]: StreamingEventsMediaAttachedInterface;
  [MediaStreamingControllerEvents.MediaDetached]: never;
  [MediaStreamingControllerEvents.LevelLoaded]: StreamingEventsLevelLoadedInterface;
  [MediaStreamingControllerEvents.LevelSwitching]: StreamingEventsLevelSwitchingInterface;
  [MediaStreamingControllerEvents.LevelSwitched]: StreamingEventsLevelSwitchedInterface;
}
