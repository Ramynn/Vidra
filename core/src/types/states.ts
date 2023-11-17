import type {RefObject} from 'react';
import {StreamingLevels} from '../libs';
import {StoryBoardInterface} from './storyboard';

export type InternalId = string;

// TODO: Fix this type after implementing streaming backends
export type ActiveStreamingBackendAtomInterface = any | null;

export interface PlayerStatesInterface {
  // TODO: Fix this type after implementing streaming backends
  streamingBackend?: InstanceType<any>;
  playerRef?: RefObject<HTMLVideoElement>;
  rootRef?: RefObject<HTMLDivElement>;
  storyboard?: StoryBoardInterface;
  isInitiated?: boolean;
  allowKeyListeners?: boolean;
  duration: number;
  currentTime: number;
  selectedSeekTime: number | null;
  isStarted: boolean;
  isPlaying: boolean;
  isEnded: boolean;
  isMuted: boolean;
  isPictureInPictureEnabled: boolean;
  volume: number;
  seeking: number | null;
  isWaiting: boolean;
  isLive: boolean;
  isFullscreen: boolean;
  isLoading: boolean;
  isFocused: boolean;
  liveTime: number;
  latency: number;
  videoWidth: number;
  videoHeight: number;
  secondsPlayed: number;
  percentPlayed: number;
  waitingDuration: number;
  mediaDuration: number;
  playOffset: number;
  levels: StreamingLevels;
  currentLevel: number;
  selectedLevel: number;
  isLoadingLevel: boolean;
  currentSrc: null | string;
  hasDVR: boolean;
  playbackRate: number;
}

export type PlayersStatesAtomInterface = Record<InternalId, PlayerStatesInterface>;

export type PlayersOptionsAtomInterface = Record<InternalId, PlayerOptionsInterface>;

// TODO: Fix this type after implementing logger
export type PlayerLoggerAtomInterface = any | null;

export enum PlayerActivityNames {
  SettingsMenu = 'internalSettingsMenu',
  TimeSeeking = 'internalSeeking',
  VolumeSeeking = 'internalVolumeSeeking',
  MouseEnter = 'internalMouseEnter',
}

export type PlayerActivityStateInterface = Record<PlayerActivityNames | string, boolean | undefined>;

export type PlayersActivityAtomInterface = Record<InternalId, PlayerActivityStateInterface>;

export interface PlayerOptionsInterface {
  url: string;
  theme: string;
  nativeControllers: boolean;
}

// TODO: Fix this type after implementing streaming backends
export type StreamingBackendClassType = new () => any;
