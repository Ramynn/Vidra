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
  Error = 'BackendError',
  ManifestLoading = 'BackendManifestLoading',
  ManifestLoaded = 'BackendManifestLoaded',
  ManifestParsed = 'BackendManifestParsed',
  BufferLoaded = 'BackendBufferLoaded',
  FragmentParsed = 'BackendFragmentParsed',
  MediaDetached = 'BackendMediaDetached',
  MediaAttached = 'BackendMediaAttached',
  LevelLoaded = 'BackendLevelLoaded',
  LevelSwitching = 'BackendLevelSwitching',
  LevelSwitched = 'BackendLevelSwitched',
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
