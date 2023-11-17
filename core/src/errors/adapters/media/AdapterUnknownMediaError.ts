import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterUnknownMediaError extends AdapterBaseMediaError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(adapter, 'AdapterUnknownMediaError', 'Unknown media error', isFatal);
  }
}
