import {BasePlayerError} from '../BasePlayerError';

export class PlayerNotInitializedError extends BasePlayerError {
  constructor() {
    super('PlayerNotInitializedError', 'You must connect media element ro player using .connectMedia() method first');
  }
}
