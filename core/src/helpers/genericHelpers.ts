import {RegularFunctionType} from '../types';

/**
 * Checks if a value is defined (not undefined or null).
 * @param value - The value to check.
 * @returns True if the value is defined, false otherwise.
 */
export const isDefined = <T>(value: T): value is NonNullable<T> => {
  return value !== undefined && value !== null;
};

/**
 * Generates a random number within the specified range.
 * @param minimum - The minimum value of the range.
 * @param maximum - The maximum value of the range.
 * @returns A random number within the specified range.
 */
export const random = (minimum: number, maximum: number): number => {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

/**
 * Calculates the exponential backoff delay for retrying an operation.
 * @param attempts - The number of attempts made.
 * @param maxDelay - The maximum delay allowed.
 * @param initialDelay - The initial delay before the first retry.
 * @param lowSide - The low end of the randomization factor.
 * @param highSide - The high end of the randomization factor.
 * @param factor - The exponential factor for calculating the delay.
 * @returns The calculated exponential backoff delay.
 */
export const calculateExponentialBackOffDelay = (
  attempts: number,
  maxDelay: number = 30000,
  initialDelay: number = 500,
  lowSide: number = 800,
  highSide: number = 1000,
  factor: number = 1.7,
): number => {
  return Math.min(maxDelay, Math.round(Math.pow(factor, attempts - 1) * random(lowSide, highSide) + initialDelay));
};

/**
 * Delays execution for a specified time.
 * @param time - The time to delay in milliseconds.
 * @returns A Promise that resolves after the specified time.
 */
export const sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
};

/**
 * Retries an asynchronous operation with exponential backoff.
 * @param handler - The asynchronous operation to retry.
 * @param limit - The maximum number of retry attempts.
 * @param retryChecker - A function to determine if a retry should be attempted based on the error.
 * @returns The result of the asynchronous operation.
 */
export const retry = async <T = unknown>(
  handler: (attempts: number) => Promise<T>,
  limit: number,
  retryChecker?: (error: Error) => boolean,
): Promise<T> => {
  for (let attempts = 0; attempts < limit; attempts++) {
    try {
      return await handler(attempts);
    } catch (error) {
      if (isDefined(retryChecker) && !retryChecker(error as Error)) {
        throw error;
      }
      if (attempts + 1 >= limit) {
        throw error;
      }
      await sleep(calculateExponentialBackOffDelay(attempts));
    }
  }

  return undefined as T; // Will never reach here
};

/**
 * Executes multiple promises with a rate limit on concurrent executions.
 * @param maxConcurrentPromises - The maximum number of promises to execute concurrently.
 * @param promises - An array of functions that return promises.
 * @returns A Promise that resolves with an array of results from the executed promises.
 */
export const promiseAllWithRateLimit = <T>(
  maxConcurrentPromises: number,
  promises: (() => Promise<T>)[],
): Promise<T[]> => {
  let activePromises = 0;
  let counter = 0;
  const results: T[] = [];
  let isFinished = false;

  return new Promise((resolve, reject) => {
    const spawnNewPromise = (): void => {
      if (isFinished) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async (): Promise<void> => {
        if (counter >= promises.length && activePromises <= 0) {
          isFinished = true;
          resolve(results);
        }

        const promise = promises[counter];

        if (!isDefined(promise)) {
          return;
        }

        try {
          counter++;
          activePromises++;
          results.push(await promise());
          activePromises--;

          if (activePromises < maxConcurrentPromises) {
            spawnNewPromise();
          }
        } catch (error) {
          if (!isFinished) {
            isFinished = true;
            reject(error);
          }
        }
      })();
    };

    for (let i = 0; i < maxConcurrentPromises; i++) {
      spawnNewPromise();
    }
  });
};

export const isFunction = (input: unknown): input is RegularFunctionType => {
  return isDefined(input) && {}.toString.call(input) === '[object Function]';
};
