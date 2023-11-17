import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseNetworkError} from '../AdapterBaseNetworkError';

export class AdapterLevelLoadTimeoutError extends AdapterBaseNetworkError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(adapter, 'AdapterLevelLoadTimeoutError', 'Level loading fails because of a timeout', isFatal);
  }
}
