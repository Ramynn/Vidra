import type {
  StreamingEventsLevelLoadedInterface,
  StreamingEventsLevelSwitchedInterface,
  StreamingEventsManifestParsedInterface,
  StreamingEventsLevelSwitchingInterface,
  StreamingEventsMediaAttachedInterface,
  StreamingEventsManifestLoadingInterface,
} from './types';

import {BasePlayerAdapterError} from '../errors';

export enum StreamingBackendEventNames {
  Error = 'StreamingBackend:Error',
  ManifestLoading = 'StreamingBackend:ManifestLoading',
  ManifestLoaded = 'StreamingBackend:ManifestLoaded',
  ManifestParsed = 'StreamingBackend:ManifestParsed',
  BufferLoaded = 'StreamingBackend:BufferLoaded',
  FragmentParsed = 'StreamingBackend:FragmentParsed',
  MediaDetached = 'StreamingBackend:MediaDetached',
  MediaAttached = 'StreamingBackend:MediaAttached',
  LevelLoaded = 'StreamingBackend:LevelLoaded',
  LevelSwitching = 'StreamingBackend:LevelSwitching',
  LevelSwitched = 'StreamingBackend:LevelSwitched',
}

export interface StreamingBackendEvents {
  [StreamingBackendEventNames.Error]: BasePlayerAdapterError;
  [StreamingBackendEventNames.ManifestLoaded]: never;
  [StreamingBackendEventNames.ManifestLoading]: StreamingEventsManifestLoadingInterface;
  [StreamingBackendEventNames.ManifestParsed]: StreamingEventsManifestParsedInterface;
  [StreamingBackendEventNames.BufferLoaded]: never;
  [StreamingBackendEventNames.FragmentParsed]: never;
  [StreamingBackendEventNames.MediaAttached]: StreamingEventsMediaAttachedInterface;
  [StreamingBackendEventNames.MediaDetached]: never;
  [StreamingBackendEventNames.LevelLoaded]: StreamingEventsLevelLoadedInterface;
  [StreamingBackendEventNames.LevelSwitching]: StreamingEventsLevelSwitchingInterface;
  [StreamingBackendEventNames.LevelSwitched]: StreamingEventsLevelSwitchedInterface;
}
