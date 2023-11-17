import type {MediaStreamingControllerInfo} from '../../libs';
import {BasePlayerAdapterError} from '../adapters';

export abstract class AdapterBaseMediaError extends BasePlayerAdapterError {
  protected constructor(adapter: MediaStreamingControllerInfo, name: string, message: string, isFatal: boolean) {
    super(adapter, name, message, isFatal);
  }
}
