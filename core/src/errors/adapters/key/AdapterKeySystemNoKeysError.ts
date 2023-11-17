import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseKeySystemError} from '../AdapterBaseKeySystemError';

export class AdapterKeySystemNoKeysError extends AdapterBaseKeySystemError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(adapter, 'AdapterKeySystemNoKeysError', 'Key System No Keys', isFatal);
  }
}
