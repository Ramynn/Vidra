import type {MediaStreamingControllerInfo} from '../../../libs';
import {BasePlayerAdapterError} from '../BasePlayerAdapterError';

export class AdapterPlaybackElementNotConnectedError extends BasePlayerAdapterError {
  constructor(adapter: MediaStreamingControllerInfo) {
    super(
      adapter,
      'AdapterPlaybackNotInitializedError',
      'You must first initialize and set a valid source and view before calling this method',
      false,
    );
  }
}
