import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterFragDecryptError extends AdapterBaseMediaError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(adapter, 'AdapterFragDecryptError', 'Fragment decryption fails', isFatal);
  }
}
