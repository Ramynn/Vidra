import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseNetworkError} from '../AdapterBaseNetworkError';

export class AdapterAudioTrackLoadError extends AdapterBaseNetworkError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(adapter, 'AdapterAudioTrackLoadError', 'Audio track loading fails because of a network error', isFatal);
  }
}
