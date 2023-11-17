import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseKeySystemError} from '../AdapterBaseKeySystemError';

export class AdapterKeySystemNoSessionError extends AdapterBaseKeySystemError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(adapter, 'AdapterKeySystemNoSessionError', 'Key System No Session', isFatal);
  }
}
