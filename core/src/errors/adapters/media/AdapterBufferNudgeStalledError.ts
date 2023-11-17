import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterBufferNudgeStalledError extends AdapterBaseMediaError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(
      adapter,
      'AdapterBufferNudgeStalledError',
      'Playback is stuck although currentTime is in a buffered area',
      isFatal,
    );
  }
}
