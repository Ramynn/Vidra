import {ElapsedTimeTracker} from './ElapsedTimeTracker';

jest.useFakeTimers();

describe('ElapsedTimeTracker', () => {
  let elapsedTimeTracker;

  beforeEach(() => {
    elapsedTimeTracker = new ElapsedTimeTracker();
  });

  afterEach(() => {
    elapsedTimeTracker.reset();
  });

  test('it starts and ends a time measurement', () => {
    elapsedTimeTracker.start();
    jest.advanceTimersByTime(2000); // Advance time by 2 seconds
    elapsedTimeTracker.end();

    expect(elapsedTimeTracker.getDuration()).toBeCloseTo(2000, 2);
  });

  test('it accumulates durations with multiple measurements', () => {
    elapsedTimeTracker.start();
    jest.advanceTimersByTime(1000); // Advance time by 1 second
    elapsedTimeTracker.end();
    elapsedTimeTracker.start();
    jest.advanceTimersByTime(3000); // Advance time by 3 seconds
    elapsedTimeTracker.end();

    expect(elapsedTimeTracker.getDuration()).toBeCloseTo(4000, 2);
  });

  test('it automatically starts on initialization if startOnInit is true', () => {
    elapsedTimeTracker = new ElapsedTimeTracker({startOnInit: true});

    jest.advanceTimersByTime(1000); // Advance time by 1 second
    elapsedTimeTracker.end();

    expect(elapsedTimeTracker.getDuration()).toBeCloseTo(1000, 2);
  });

  test('it resets the tracker and clears accumulated durations', () => {
    elapsedTimeTracker.start();
    jest.advanceTimersByTime(2000); // Advance time by 2 seconds
    elapsedTimeTracker.end();
    elapsedTimeTracker.reset();

    expect(elapsedTimeTracker.getDuration()).toBe(0);
  });

  test('it does not accumulate durations if no measurement is in progress', () => {
    elapsedTimeTracker.end();
    elapsedTimeTracker.start();
    jest.advanceTimersByTime(1000); // Advance time by 1 second
    elapsedTimeTracker.end();

    expect(elapsedTimeTracker.getDuration()).toBeCloseTo(1000, 2);
  });

  test('it resets the tracker and does not start automatically on initialization if startOnInit is false', () => {
    elapsedTimeTracker = new ElapsedTimeTracker({startOnInit: false});

    jest.advanceTimersByTime(1000); // Advance time by 1 second
    elapsedTimeTracker.end();

    expect(elapsedTimeTracker.getDuration()).toBe(0);
  });

  test('it does not accumulate durations if start is called without ending a measurement', () => {
    elapsedTimeTracker.start();
    elapsedTimeTracker.start(); // Calling start again without ending the first measurement

    expect(elapsedTimeTracker.getDuration()).toBe(0);
  });

  test('it handles restarting a measurement with restart=true', () => {
    elapsedTimeTracker.start();
    jest.advanceTimersByTime(1000); // Advance time by 1 second
    elapsedTimeTracker.end();
    elapsedTimeTracker.start(true); // Restart the measurement
    jest.advanceTimersByTime(2000); // Advance time by 2 seconds
    elapsedTimeTracker.end();

    expect(elapsedTimeTracker.getDuration()).toBeCloseTo(3000, 2);
  });

  test('it handles precision issues with tolerance', () => {
    elapsedTimeTracker.start();
    jest.advanceTimersByTime(100.12345); // Advance time by a precise amount
    elapsedTimeTracker.end();

    // Adjust the expected value based on precision issues
    expect(elapsedTimeTracker.getDuration()).toBeCloseTo(100.12345, 5);
  });

  test('it does not execute end() if start is called with ignorePreEndCommit=true', () => {
    elapsedTimeTracker.start();
    jest.advanceTimersByTime(1000); // Advance time by 1 second
    elapsedTimeTracker.start(true); // Start a new measurement without ending the first one

    expect(elapsedTimeTracker.getDuration()).toBe(0);
  });

  test('it does not execute pre-start commit if start is called with ignorePreStartCommit=true', () => {
    elapsedTimeTracker.start(true); // Start a new measurement without executing pre-start commit

    expect(elapsedTimeTracker.getDuration()).toBe(0);
  });
});
