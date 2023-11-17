import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseKeySystemError} from '../AdapterBaseKeySystemError';

export class AdapterKeySystemNoKeysError extends AdapterBaseKeySystemError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(adapter, 'AdapterKeySystemNoKeysError', 'Key System No Keys', isFatal);
  }
}
