import type {StreamingBackendInfoInterface} from '../../libs';
import {BasePlayerError} from '../BasePlayerError';

export abstract class BasePlayerAdapterError extends BasePlayerError {
  isFatal: boolean = false;
  adapter!: StreamingBackendInfoInterface;

  protected constructor(adapter: StreamingBackendInfoInterface, name: string, message: string, isFatal: boolean) {
    super(name, message);

    this.adapter = adapter;
    this.isFatal = isFatal;
  }
}
