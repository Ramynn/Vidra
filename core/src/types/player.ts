import type {SyntheticEvent, VideoHTMLAttributes} from 'react';
import {PlainObjectType} from './utils';

export type PlayerDomMethodsEventType = SyntheticEvent<HTMLVideoElement, Event>;

export type PlayerSeekbarEventType = Event | MouseEvent | TouchEvent;

export enum PlayerElementMethods {
  OnLoadStart = 'onLoadStart',
  OnWaiting = 'onWaiting',
  OnCanPlay = 'onCanPlay',
  OnCanPlayThrough = 'onCanPlayThrough',
  OnPlaying = 'onPlaying',
  OnEnded = 'onEnded',
  OnSeeking = 'onSeeking',
  OnSeeked = 'onSeeked',
  OnPlay = 'onPlay',
  OnPause = 'onPause',
  OnProgress = 'onProgress',
  OnDurationChange = 'onDurationChange',
  OnError = 'onError',
  OnSuspend = 'onSuspend',
  OnAbort = 'onAbort',
  OnEmptied = 'onEmptied',
  OnStalled = 'onStalled',
  OnLoadedMetadata = 'onLoadedMetadata',
  OnLoadedData = 'onLoadedData',
  OnRateChange = 'onRateChange',
  OnVolumeChange = 'onVolumeChange',
}

export type PlayerElementType = VideoHTMLAttributes<HTMLVideoElement>;

export type PlayerTranslations = PlainObjectType;
