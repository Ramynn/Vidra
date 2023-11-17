import type {RefObject} from 'react';
import {ClientLogger, MediaStreamingController, StreamingLevels} from '../libs';
import {StoryBoardInterface} from './storyboard';

export type InternalId = string;

export type ActiveStreamingBackendAtomInterface = StreamingBackendClassType | null;

export interface PlayerStatesInterface {
  streamingBackend?: InstanceType<StreamingBackendClassType>;
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

export type PlayerLoggerAtomInterface = ClientLogger | null;

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

export type StreamingBackendClassType = new () => MediaStreamingController;
