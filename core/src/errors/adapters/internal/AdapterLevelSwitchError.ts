import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseNetworkError} from '../AdapterBaseNetworkError';

export class AdapterLevelSwitchError extends AdapterBaseNetworkError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(adapter, 'AdapterLevelSwitchError', 'Level switching fails', isFatal);
  }
}
