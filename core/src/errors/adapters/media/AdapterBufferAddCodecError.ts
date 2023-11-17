import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterBufferAddCodecError extends AdapterBaseMediaError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(adapter, 'AdapterBufferAddCodecError', 'Fragment parsing fails', isFatal);
  }
}
