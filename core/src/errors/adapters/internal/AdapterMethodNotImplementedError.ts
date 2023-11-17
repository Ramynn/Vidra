import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseInternalError} from '../AdapterBaseInternalError';

export class AdapterMethodNotImplementedError extends AdapterBaseInternalError {
  constructor(adapter: StreamingBackendInfoInterface, method: string) {
    super(adapter, 'AdapterMethodNotImplementedError', `Method of "${method}" is not implemented`, true);
  }
}
