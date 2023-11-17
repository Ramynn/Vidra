export const isDefined = <T>(value: T): value is NonNullable<T> => {
  return value !== undefined && value !== null;
};

export const random = (minimum: number, maximum: number): number => {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

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

export const sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
};

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
