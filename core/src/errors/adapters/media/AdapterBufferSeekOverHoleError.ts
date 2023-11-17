import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterBufferSeekOverHoleError extends AdapterBaseMediaError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(
      adapter,
      'AdapterBufferSeekOverHoleError',
      'Adapter seeks over a buffer hole to unstuck the playback',
      isFatal,
    );
  }
}
