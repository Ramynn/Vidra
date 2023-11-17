import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterBufferIncompatibleCodecsError extends AdapterBaseMediaError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(
      adapter,
      'AdapterBufferIncompatibleCodecsError',
      'No MediaSource(s) could be created based on track codec(s)',
      isFatal,
    );
  }
}
