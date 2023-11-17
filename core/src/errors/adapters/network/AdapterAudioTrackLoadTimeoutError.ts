import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseNetworkError} from '../AdapterBaseNetworkError';

export class AdapterAudioTrackLoadTimeoutError extends AdapterBaseNetworkError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(adapter, 'AdapterAudioTrackLoadTimeoutError', 'Audio track loading fails because of a timeout', isFatal);
  }
}
