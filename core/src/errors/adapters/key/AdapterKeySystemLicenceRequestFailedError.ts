import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseKeySystemError} from '../AdapterBaseKeySystemError';

export class AdapterKeySystemLicenceRequestFailedError extends AdapterBaseKeySystemError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(adapter, 'AdapterKeySystemLicenceRequestFailedError', 'Key System No Keys', isFatal);
  }
}
