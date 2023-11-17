import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterFragParseError extends AdapterBaseMediaError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(adapter, 'AdapterFragParseError', 'Fragment parsing fails', isFatal);
  }
}
