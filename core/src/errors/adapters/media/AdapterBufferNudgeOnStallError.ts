import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterBufferNudgeOnStallError extends AdapterBaseMediaError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(
      adapter,
      'AdapterBufferNudgeOnStallError',
      'Playback is stuck although currentTime is in a buffered area',
      isFatal,
    );
  }
}
