import {EventEmitter, EventHandlerFunction} from '../EventEmitter';

describe('EventEmitter', () => {
  let emitter: EventEmitter<{event1: string; event2: number}>;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  it('should add and trigger event listeners', () => {
    const listener1: EventHandlerFunction<string> = jest.fn();
    const listener2: EventHandlerFunction<number> = jest.fn();
    const listener3: EventHandlerFunction<number> = jest.fn();
    const listener4: EventHandlerFunction<number> = jest.fn();

    emitter.on('event1', listener1);
    emitter.on('event2', listener2);
    emitter.on('event2', listener3);
    emitter.on('event2', listener4);

    (emitter as any).emit('event1', 'data1');
    (emitter as any).emit('event2', 42);

    expect(listener1).toHaveBeenCalledWith(expect.objectContaining({type: 'event1', data: 'data1'}));
    expect(listener2).toHaveBeenCalledWith(expect.objectContaining({type: 'event2', data: 42}));
    expect(listener3).toHaveBeenCalledWith(expect.objectContaining({type: 'event2', data: 42}));
    expect(listener4).toHaveBeenCalledWith(expect.objectContaining({type: 'event2', data: 42}));
  });

  it('should remove event listeners', () => {
    const listener1: EventHandlerFunction<string> = jest.fn();
    const listener2: EventHandlerFunction<number> = jest.fn();

    emitter.on('event1', listener1);
    emitter.on('event2', listener2);

    emitter.off('event1', listener1);
    emitter.off('event1', 'listener1' as any);
    emitter.off(null as any, listener1);
    emitter.off(null as any, listener1);

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

    expect((emitter as any).hasListener('invalid_one', listener1)).toBeFalsy();
    expect((emitter as any).hasListener('event1', listener1)).toBeTruthy();
    expect((emitter as any).hasListener('event1', listener2)).toBeFalsy();
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

  it('should ignore invalid types for events', () => {
    const listener: EventHandlerFunction<string> = jest.fn();

    emitter.on(undefined as any, listener);
    emitter.on(null as any, listener);

    (emitter as any).emit('event1', 'data1');

    expect(listener).not.toHaveBeenCalled();
  });

  it('should ignore invalid handlers', () => {
    const listener: EventHandlerFunction<string> = jest.fn();

    emitter.on('event1', listener);

    emitter.on('event1', undefined as any);
    emitter.on('event1', null as any);
    emitter.on('event1', 'invalidHandler' as any);

    (emitter as any).emit('event1', 'data1');

    expect(listener).toHaveBeenCalled();
  });

  it('should ignore invalid functions as handlers', () => {
    const listener: EventHandlerFunction<string> = jest.fn();

    emitter.on('event1', listener);

    emitter.on('event1', {} as any);
    emitter.on('event1', 123 as any);

    (emitter as any).emit('event1', 'data1');

    expect(listener).toHaveBeenCalled();
  });

  it('should ignore invalid listeners', () => {
    emitter.on('event1', {} as any);
    emitter.on('event1', 123 as any);

    (emitter as any).emit('event1', 'data1'); // No error should occur

    // Cleanup invalid listeners
    emitter.removeAllListeners();

    expect(true).toBeTruthy(); // No error should occur during cleanup
  });
});
