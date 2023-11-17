import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseKeySystemError} from '../AdapterBaseKeySystemError';

export class AdapterKeySystemNoInitDataError extends AdapterBaseKeySystemError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(adapter, 'AdapterKeySystemNoInitDataError', 'Key System No Init Data', isFatal);
  }
}
