import {
  isDefined,
  random,
  calculateExponentialBackOffDelay,
  sleep,
  retry,
  promiseAllWithRateLimit,
  isFunction,
} from '../genericHelpers';

describe('isDefined', () => {
  test('returns true for defined values', () => {
    expect(isDefined(42)).toBe(true);
    expect(isDefined('hello')).toBe(true);
    expect(isDefined({key: 'value'})).toBe(true);
  });

  test('returns false for undefined or null values', () => {
    expect(isDefined(undefined)).toBe(false);
    expect(isDefined(null)).toBe(false);
  });
});

describe('random', () => {
  test('generates random numbers within the specified range', () => {
    const min = 5;
    const max = 10;
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});

describe('calculateExponentialBackOffDelay', () => {
  test('calculates exponential backoff delay', () => {
    const delay = calculateExponentialBackOffDelay(3, 30000, 500, 800, 1000, 1.7);
    expect(delay).toBeGreaterThan(0);
  });
});

describe('sleep', () => {
  test('resolves after a specified time', async () => {
    const start = Date.now();
    await sleep(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
  });
});

describe('retry', () => {
  test('retries the handler until the limit is reached', async () => {
    const handler = jest.fn().mockRejectedValueOnce('Error').mockResolvedValue('Success');
    await retry(handler, 3);

    expect(handler).toHaveBeenCalledTimes(2);
  });
});

describe('promiseAllWithRateLimit', () => {
  test('resolves all promises with rate limiting', async () => {
    const mockPromise = jest.fn().mockResolvedValue('Success');
    const promises = Array(10).fill(mockPromise);
    const result = await promiseAllWithRateLimit(3, promises);

    expect(mockPromise).toHaveBeenCalledTimes(10);
    expect(result).toEqual(Array(10).fill('Success'));
  });

  test('resolves with an empty array if promises array is empty', async () => {
    const result = await promiseAllWithRateLimit(3, []);
    expect(result).toEqual([]);
  });
});

describe('isFunction', () => {
  test('returns true for a regular function', () => {
    const regularFunction = function () {
      // function body
    };
    expect(isFunction(regularFunction)).toBe(true);
  });

  test('returns true for an arrow function', () => {
    const arrowFunction = () => {
      // function body
    };
    expect(isFunction(arrowFunction)).toBe(true);
  });

  test('returns true for a function with parameters', () => {
    const functionWithParams = function (x: number, y: number): number {
      return x + y;
    };
    expect(isFunction(functionWithParams)).toBe(true);
  });

  test('returns true for an anonymous function', () => {
    expect(isFunction(function () {})).toBe(true);
  });

  test('returns false for an object', () => {
    const object = {key: 'value'};
    expect(isFunction(object)).toBe(false);
  });

  test('returns false for an array', () => {
    const array = [1, 2, 3];
    expect(isFunction(array)).toBe(false);
  });

  test('returns false for a string', () => {
    const str = 'Hello, World!';
    expect(isFunction(str)).toBe(false);
  });

  test('returns false for a number', () => {
    const number = 42;
    expect(isFunction(number)).toBe(false);
  });

  test('returns false for undefined', () => {
    const undefinedValue = undefined;
    expect(isFunction(undefinedValue)).toBe(false);
  });

  test('returns false for null', () => {
    const nullValue = null;
    expect(isFunction(nullValue)).toBe(false);
  });
});
