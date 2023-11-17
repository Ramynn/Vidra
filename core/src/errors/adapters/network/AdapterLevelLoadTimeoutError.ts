import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseNetworkError} from '../AdapterBaseNetworkError';

export class AdapterLevelLoadTimeoutError extends AdapterBaseNetworkError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(adapter, 'AdapterLevelLoadTimeoutError', 'Level loading fails because of a timeout', isFatal);
  }
}
