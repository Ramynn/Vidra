import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseKeySystemError} from '../AdapterBaseKeySystemError';

export class AdapterKeyUnknownError extends AdapterBaseKeySystemError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(adapter, 'AdapterKeyUnknownError', 'Key System No Session', isFatal);
  }
}
