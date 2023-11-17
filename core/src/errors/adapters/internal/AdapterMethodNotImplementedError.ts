import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseInternalError} from '../AdapterBaseInternalError';

export class AdapterMethodNotImplementedError extends AdapterBaseInternalError {
  constructor(adapter: MediaStreamingControllerInfo, method: string) {
    super(adapter, 'AdapterMethodNotImplementedError', `Method of "${method}" is not implemented`, true);
  }
}
