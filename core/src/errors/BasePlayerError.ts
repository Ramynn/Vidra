import {BaseError} from '../libs';

export abstract class BasePlayerError extends BaseError {
  protected constructor(name: string, message: string) {
    super(name, message);
  }
}
