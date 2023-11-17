import type {MediaStreamingControllerInfo} from '../../libs';
import {BasePlayerError} from '../BasePlayerError';

export abstract class BasePlayerAdapterError extends BasePlayerError {
  isFatal: boolean = false;
  adapter!: MediaStreamingControllerInfo;

  protected constructor(adapter: MediaStreamingControllerInfo, name: string, message: string, isFatal: boolean) {
    super(name, message);

    this.adapter = adapter;
    this.isFatal = isFatal;
  }
}
