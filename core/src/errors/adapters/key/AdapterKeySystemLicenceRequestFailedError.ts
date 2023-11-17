import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseKeySystemError} from '../AdapterBaseKeySystemError';

export class AdapterKeySystemLicenceRequestFailedError extends AdapterBaseKeySystemError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(adapter, 'AdapterKeySystemLicenceRequestFailedError', 'Key System No Keys', isFatal);
  }
}
