import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterFragDecryptError extends AdapterBaseMediaError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(adapter, 'AdapterFragDecryptError', 'Fragment decryption fails', isFatal);
  }
}
