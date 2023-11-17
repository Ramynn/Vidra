import {
  isDefined,
  random,
  calculateExponentialBackOffDelay,
  sleep,
  retry,
  promiseAllWithRateLimit,
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

  test('throws an error if retryChecker returns false', async () => {
    const handler = jest.fn().mockRejectedValue('Error');
    const retryChecker = jest.fn().mockReturnValue(false);

    await expect(retry(handler, 3, retryChecker)).rejects.toThrow('Error');
    expect(handler).toHaveBeenCalledTimes(1);
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
