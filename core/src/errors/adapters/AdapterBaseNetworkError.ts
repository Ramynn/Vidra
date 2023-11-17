import type {StreamingBackendInfoInterface} from '../../libs';
import {BasePlayerAdapterError} from '../adapters';

export abstract class AdapterBaseNetworkError extends BasePlayerAdapterError {
  protected constructor(adapter: StreamingBackendInfoInterface, name: string, message: string, isFatal: boolean) {
    super(adapter, name, message, isFatal);
  }
}
