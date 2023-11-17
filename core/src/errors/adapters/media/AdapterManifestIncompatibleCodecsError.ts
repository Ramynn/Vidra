import type {MediaStreamingControllerInfo} from '../../../libs';
import {AdapterBaseMediaError} from '../AdapterBaseMediaError';

export class AdapterManifestIncompatibleCodecsError extends AdapterBaseMediaError {
  constructor(adapter: MediaStreamingControllerInfo, isFatal: boolean = false) {
    super(
      adapter,
      'AdapterManifestIncompatibleCodecsError',
      'manifest only contains quality level with codecs incompatible with MediaSource Engine',
      isFatal,
    );
  }
}
