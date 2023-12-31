import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterBufferFullError extends AdapterBaseMediaError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(
      adapter,
      'AdapterBufferFullError',
      'No data can be appended anymore in media buffer because it is full. this error is recovered by reducing the max buffer length',
      isFatal,
    );
  }
}
