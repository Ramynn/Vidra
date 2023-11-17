import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseNetworkError} from '../AdapterBaseNetworkError';

export class AdapterFragLoadTimeoutError extends AdapterBaseNetworkError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(adapter, 'AdapterFlagLoadTimeoutError', 'Fragment loading fails because of a timeout', isFatal);
  }
}
