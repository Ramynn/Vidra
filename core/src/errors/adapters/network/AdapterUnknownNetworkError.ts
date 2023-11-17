import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseNetworkError} from '../AdapterBaseNetworkError';

export class AdapterUnknownNetworkError extends AdapterBaseNetworkError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(adapter, 'AdapterUnknownNetworkError', 'Unknown network error', isFatal);
  }
}
