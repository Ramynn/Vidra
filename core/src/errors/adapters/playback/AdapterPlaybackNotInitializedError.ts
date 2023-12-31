import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBasePlaybackError} from '../AdapterBasePlaybackError';

export class AdapterPlaybackNotInitializedError extends AdapterBasePlaybackError {
  constructor(adapter: MediaStreamingControllerInfo) {
    super(
      adapter,
      'AdapterPlaybackNotInitializedError',
      'You must first initialize and set a valid source and view before calling this method',
      false,
    );
  }
}
