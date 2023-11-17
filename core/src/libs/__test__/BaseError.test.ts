import {BaseError, BaseErrorUserMessage} from '../BaseError';

class CustomError extends BaseError {
  constructor(name: string, message: string, userMessage?: BaseErrorUserMessage) {
    super(name, message, userMessage);
  }
}

describe('BaseError', () => {
  it('should create an instance of BaseError with default properties', () => {
    const error = new CustomError('TestError', 'This is a test error');

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(BaseError);
    expect(error.name).toEqual('TestError');
    expect(error.message).toEqual('This is a test error');
    expect(error.time).toBeInstanceOf(Date);
    expect(error.userMessage).toBeUndefined();
  });

  it('should create an instance of BaseError with userMessage', () => {
    const userMessage: BaseErrorUserMessage = {
      title: 'Test Title',
      messages: ['This is a user-friendly message.'],
    };

    const error = new CustomError('TestError', 'This is a test error', userMessage);

    expect(error).toBeInstanceOf(BaseError);
    expect(error.userMessage).toEqual(userMessage);
  });

  it('should have unique ids for each instance', () => {
    const error1 = new CustomError('Error1', 'Message 1');
    const error2 = new CustomError('Error2', 'Message 2');

    expect(error1.id).not.toEqual(error2.id);
  });

  it('should handle inheritance and instanceof correctly', () => {
    class CustomError extends BaseError {
      constructor(message: string) {
        super('CustomError', message);
      }
    }

    const customError = new CustomError('Custom error message');

    expect(customError).toBeInstanceOf(Error);
    expect(customError).toBeInstanceOf(BaseError);
    expect(customError).toBeInstanceOf(CustomError);
    expect(customError.name).toEqual('CustomError');
    expect(customError.message).toEqual('Custom error message');
  });

  // Add more test cases based on your specific scenarios...
});
