import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseNetworkError} from '../AdapterBaseNetworkError';

export class AdapterLevelSwitchError extends AdapterBaseNetworkError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(adapter, 'AdapterLevelSwitchError', 'Level switching fails', isFatal);
  }
}
