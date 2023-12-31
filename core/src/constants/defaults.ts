import {PlayerStatesInterface, StreamingBackendClassType} from '../types';
import {HlsBackend} from '../backends';

export const DEFAULT_STREAMING_BACKENDS: StreamingBackendClassType[] = [HlsBackend];

export const DEFAULT_PLAYER_STATE: PlayerStatesInterface = Object.freeze({
  isStarted: false,
  volume: 1,
  isPlaying: false,
  isEnded: false,
  isMuted: false,
  isPictureInPictureEnabled: false,
  seeking: null,
  isWaiting: false,
  isLive: false,
  isFullscreen: false,
  isFocused: false,
  isLoading: true,
  liveTime: 0,
  latency: 0,
  videoWidth: 0,
  videoHeight: 0,
  secondsPlayed: 0,
  secondsPlayed2: 0,
  percentPlayed: 0,
  waitingDuration: 0,
  mediaDuration: 0,
  playOffset: 0,
  levels: [],
  currentLevel: -1,
  selectedLevel: -1,
  isLoadingLevel: false,
  currentSrc: null,
  hasDVR: false,
  duration: 0,
  currentTime: 0,
  selectedSeekTime: null,
  playbackRate: 1,
});

export const DEFAULT_THEME = 'default';

export const DEFAULT_LOCALIZATION = {};
