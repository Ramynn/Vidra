import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterUnknownMediaError extends AdapterBaseMediaError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(adapter, 'AdapterUnknownMediaError', 'Unknown media error', isFatal);
  }
}
