import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterBufferNudgeOnStallError extends AdapterBaseMediaError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(
      adapter,
      'AdapterBufferNudgeOnStallError',
      'Playback is stuck although currentTime is in a buffered area',
      isFatal,
    );
  }
}
