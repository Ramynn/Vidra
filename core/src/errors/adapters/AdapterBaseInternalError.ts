import type {StreamingBackendInfoInterface} from '../../libs';
import {BasePlayerAdapterError} from '../adapters';

export abstract class AdapterBaseInternalError extends BasePlayerAdapterError {
  protected constructor(adapter: StreamingBackendInfoInterface, name: string, message: string, isFatal: boolean) {
    super(adapter, name, message, isFatal);
  }
}
