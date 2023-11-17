import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseKeySystemError} from '../AdapterBaseKeySystemError';

export class AdapterKeySystemNoAccessError extends AdapterBaseKeySystemError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(adapter, 'AdapterKeySystemNoAccessError', 'Key System No Access', isFatal);
  }
}
