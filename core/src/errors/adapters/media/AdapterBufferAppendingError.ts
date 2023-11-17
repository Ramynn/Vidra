import type {StreamingBackendInfoInterface} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterBufferAppendingError extends AdapterBaseMediaError {
  constructor(adapter: StreamingBackendInfoInterface, isFatal: boolean = false) {
    super(adapter, 'AdapterBufferAppendingError', 'Exception is raised during buffer appending', isFatal);
  }
}
