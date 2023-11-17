import {RecurringTaskScheduler} from '../RecurringTaskScheduler/RecurringTaskScheduler';

jest.useFakeTimers();

describe('RecurringTaskScheduler', () => {
  let recurringTaskScheduler;
  let callbackMock;

  beforeEach(() => {
    callbackMock = jest.fn();
    recurringTaskScheduler = new RecurringTaskScheduler({
      callback: callbackMock,
      duration: 1000,
      enablePreEndCommit: true,
      enablePreStartCommit: true,
    });
  });

  afterEach(() => {
    recurringTaskScheduler.end();
    jest.clearAllTimers();
  });

  test('it starts and executes the callback at each interval', () => {
    recurringTaskScheduler.start();

    jest.advanceTimersByTime(3000); // Advance time by 3 seconds

    expect(callbackMock).toHaveBeenCalledTimes(4);
  });

  test('it executes pre-start commit when starting the interval', () => {
    recurringTaskScheduler.start();

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });

  test('it executes pre-end commit before ending the interval', () => {
    recurringTaskScheduler.start();
    recurringTaskScheduler.end();

    expect(callbackMock).toHaveBeenCalledTimes(2);
  });

  test('it refreshes the interval and executes pre-start commit', () => {
    recurringTaskScheduler.start();
    recurringTaskScheduler.refresh();

    expect(callbackMock).toHaveBeenCalledTimes(2);
  });

  test('it refreshes the interval without executing pre-start commit', () => {
    recurringTaskScheduler.refresh();

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });

  test('it ends the interval and executes pre-end commit', () => {
    recurringTaskScheduler.start();
    recurringTaskScheduler.end();

    expect(callbackMock).toHaveBeenCalledTimes(2);
  });

  test('it ends the interval without executing pre-end commit', () => {
    recurringTaskScheduler.start();
    recurringTaskScheduler.end(true);

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });

  test('it commits immediately without waiting for the interval', () => {
    recurringTaskScheduler.commit();

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });

  test('it does not execute pre-start commit when starting the interval with ignorePreStartCommit', () => {
    recurringTaskScheduler.start(true);

    expect(callbackMock).toHaveBeenCalledTimes(0);
  });

  test('it does not execute pre-end commit when ending the interval with ignorePreEndCommit', () => {
    recurringTaskScheduler.start();
    recurringTaskScheduler.end(true);

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});
