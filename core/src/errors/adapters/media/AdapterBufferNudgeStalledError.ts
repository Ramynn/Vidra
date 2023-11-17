import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterBufferNudgeStalledError extends AdapterBaseMediaError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(
      adapter,
      'AdapterBufferNudgeStalledError',
      'Playback is stuck although currentTime is in a buffered area',
      isFatal,
    );
  }
}
