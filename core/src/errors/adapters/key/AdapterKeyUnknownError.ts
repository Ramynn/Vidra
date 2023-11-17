import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseKeySystemError} from '../AdapterBaseKeySystemError';

export class AdapterKeyUnknownError extends AdapterBaseKeySystemError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(adapter, 'AdapterKeyUnknownError', 'Key System No Session', isFatal);
  }
}
