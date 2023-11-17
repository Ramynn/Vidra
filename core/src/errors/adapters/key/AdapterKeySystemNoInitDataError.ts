import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseKeySystemError} from '../AdapterBaseKeySystemError';

export class AdapterKeySystemNoInitDataError extends AdapterBaseKeySystemError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(adapter, 'AdapterKeySystemNoInitDataError', 'Key System No Init Data', isFatal);
  }
}
