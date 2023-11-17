import {EventEmitter, EventHandlerFunction} from '../EventEmitter';

describe('EventEmitter', () => {
  let emitter: EventEmitter<{event1: string; event2: number}>;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  it('should add and trigger event listeners', () => {
    const listener1: EventHandlerFunction<string> = jest.fn();
    const listener2: EventHandlerFunction<number> = jest.fn();

    emitter.on('event1', listener1);
    emitter.on('event2', listener2);

    (emitter as any).emit('event1', 'data1');
    (emitter as any).emit('event2', 42);

    expect(listener1).toHaveBeenCalledWith(expect.objectContaining({type: 'event1', data: 'data1'}));
    expect(listener2).toHaveBeenCalledWith(expect.objectContaining({type: 'event2', data: 42}));
  });

  it('should remove event listeners', () => {
    const listener1: EventHandlerFunction<string> = jest.fn();
    const listener2: EventHandlerFunction<number> = jest.fn();

    emitter.on('event1', listener1);
    emitter.on('event2', listener2);

    emitter.off('event1', listener1);

    (emitter as any).emit('event2', 2);

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).toHaveBeenCalled();
    expect(listener2).toHaveBeenCalledWith(expect.objectContaining({type: 'event2', data: 2}));
  });

  it('should remove all listeners for an event type', () => {
    const listener1: EventHandlerFunction<string> = jest.fn();
    const listener2: EventHandlerFunction<number> = jest.fn();

    emitter.on('event1', listener1);
    emitter.on('event2', listener2);

    emitter.off('event1');

    (emitter as any).emit('event1', 'data1');
    (emitter as any).emit('event2', 42);

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).toHaveBeenCalledWith(expect.objectContaining({type: 'event2', data: 42}));
  });

  it('should remove all listeners', () => {
    const listener1: EventHandlerFunction<string> = jest.fn();
    const listener2: EventHandlerFunction<number> = jest.fn();

    emitter.on('event1', listener1);
    emitter.on('event2', listener2);

    emitter.removeAllListeners();

    (emitter as any).emit('event1', 'data1');
    (emitter as any).emit('event2', 42);

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).not.toHaveBeenCalled();
  });

  it('should trigger once listeners only once', () => {
    const onceListener: EventHandlerFunction<string> = jest.fn();

    emitter.once('event1', onceListener);

    (emitter as any).emit('event1', 'data1');
    (emitter as any).emit('event1', 'data2');

    expect(onceListener).toHaveBeenCalledWith(expect.objectContaining({type: 'event1', data: 'data1'}));
    expect(onceListener).not.toHaveBeenCalledWith(expect.objectContaining({type: 'event1', data: 'data2'}));
  });

  it('should correctly check if there are listeners', () => {
    const listener1: EventHandlerFunction<string> = jest.fn();
    const listener2: EventHandlerFunction<number> = jest.fn();

    emitter.on('event1', listener1);

    expect((emitter as any).hasListener('event1')).toBeTruthy();
    expect((emitter as any).hasListener('event2')).toBeFalsy();

    emitter.on('event2', listener2);

    expect((emitter as any).hasListener('event2')).toBeTruthy();

    emitter.off('event1', listener1);

    expect((emitter as any).hasListener('event1')).toBeFalsy();
  });

  it('should pass correct removeListener function to event handler', () => {
    const listener: EventHandlerFunction<string> = jest.fn();

    emitter.on('event1', (event) => {
      expect(event.removeListener).toBeDefined();
      event.removeListener();
    });

    (emitter as any).emit('event1', 'data1');

    expect(listener).not.toHaveBeenCalled();
  });

  it('should handle different data types for events', () => {
    const stringListener: EventHandlerFunction<string> = jest.fn();
    const numberListener: EventHandlerFunction<number> = jest.fn();

    emitter.on('event1', stringListener);
    emitter.on('event2', numberListener);

    (emitter as any).emit('event1', 'data1');
    (emitter as any).emit('event2', 42);

    expect(stringListener).toHaveBeenCalledWith(expect.objectContaining({type: 'event1', data: 'data1'}));
    expect(numberListener).toHaveBeenCalledWith(expect.objectContaining({type: 'event2', data: 42}));
  });

  // Add more test cases based on your specific scenarios...
});
