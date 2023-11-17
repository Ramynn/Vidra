import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseNetworkError} from '../AdapterBaseNetworkError';

export class AdapterManifestParsingError extends AdapterBaseNetworkError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(adapter, 'AdapterManifestLoadTimeoutError', 'Manifest loading fails because of a timeout', isFatal);
  }
}
