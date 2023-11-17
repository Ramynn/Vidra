import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterBufferSeekOverHoleError extends AdapterBaseMediaError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(
      adapter,
      'AdapterBufferSeekOverHoleError',
      'Adapter seeks over a buffer hole to unstuck the playback',
      isFatal,
    );
  }
}
