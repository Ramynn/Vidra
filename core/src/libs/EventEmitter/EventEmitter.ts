import {PlainObjectType} from '../../types';
import {isDefined, isFunction} from '../../helpers';

/**
 * Defines a function type for event handlers.
 * @template DataType - The data type associated with the event.
 */
export type EventHandlerFunction<DataType> = (event: EventType<DataType>) => void;

/**
 * Represents an event handler with methods to manage its lifecycle.
 * @template DataType - The data type associated with the event.
 */
export type EventHandler<DataType> = {
  handler: EventHandlerFunction<DataType>;
  off: () => void;
  once: boolean;
};

/**
 * Represents the structure of an event.
 * @template DataType - The data type associated with the event.
 * @template EventsName - The name of the event.
 */
export interface EventType<DataType, EventsName = any> {
  type: EventsName;
  data: DataType;
  removeListener: () => void;
  once: boolean;
}

/**
 * Represents a collection of event handlers for different event types.
 * @template EventsMap - The type defining the mapping of event names to their associated data types.
 */
export type EventHandlers<EventsMap extends Record<any, any>> = Record<
  keyof EventsMap,
  EventHandler<EventsMap[keyof EventsMap]>[] | undefined
>;

/**
 * A generic event emitter class for managing and triggering events.
 * @template EventsMap - The type defining the mapping of event names to their associated data types.
 */
export class EventEmitter<EventsMap extends Record<string, any>> {
  private handlers: EventHandlers<EventsMap> = <EventHandlers<EventsMap>>{};

  /**
   * Checks if the provided type is a valid event type.
   * @param type - The event type to check.
   * @returns True if the type is valid, false otherwise.
   * @private
   */
  private static isValidType(type?: unknown | symbol): boolean {
    return isDefined(type);
  }

  /**
   * Checks if the provided handler is a valid function.
   * @param handler - The event handler function to check.
   * @returns True if the handler is a valid function, false otherwise.
   * @private
   */
  private static isValidHandler(handler?: unknown | EventHandlerFunction<PlainObjectType>): boolean {
    return isFunction(handler);
  }

  /**
   * Adds an event listener for a specific event type.
   * @param type - The event type to listen for.
   * @param handler - The event handler function.
   */
  public on<EventsName extends keyof EventsMap>(
    type: EventsName,
    handler: EventHandlerFunction<EventsMap[EventsName]>,
  ): void {
    if (!EventEmitter.isValidType(type) || !EventEmitter.isValidHandler(handler)) {
      return;
    }

    const removeListener = (): void => {
      this.off(type, handler);
    };

    const eventHandler: EventHandler<EventsMap[EventsName]> = {
      handler,
      off: removeListener,
      once: false,
    };

    this.attachEvent(type, eventHandler);
  }

  /**
   * Adds a one-time event listener for a specific event type.
   * @param type - The event type to listen for.
   * @param handler - The event handler function.
   */
  public once<EventsName extends keyof EventsMap>(
    type: EventsName,
    handler: EventHandlerFunction<EventsMap[EventsName]>,
  ): void {
    if (!EventEmitter.isValidType(type) || !EventEmitter.isValidHandler(handler)) {
      return;
    }

    const removeListener = (): void => {
      this.off(type, handler);
    };

    const eventHandler: EventHandler<EventsMap[EventsName]> = {
      handler,
      off: removeListener,
      once: true,
    };

    this.attachEvent(type, eventHandler);
  }

  /**
   * Removes an event listener for a specific event type.
   * If no handler is provided, removes all listeners for the given type.
   * @param type - The event type to remove the listener from.
   * @param handler - The event handler function (optional).
   */
  public off<EventsName extends keyof EventsMap>(
    type: EventsName,
    handler?: EventHandlerFunction<EventsMap[EventsName]>,
  ): void {
    if (!handler) {
      this.handlers[type] = [];

      return;
    }

    if (!EventEmitter.isValidType(type) || !EventEmitter.isValidHandler(handler)) {
      return;
    }

    const handlers = this.handlers[type];

    if (!handlers || !handlers.length) {
      return;
    }

    for (let index = 0; index < handlers.length; index++) {
      if (handlers[index].handler === handler) {
        handlers.splice(index, 1);

        break;
      }
    }
  }

  /**
   * Removes all event listeners from the emitter.
   */
  public removeAllListeners(): void {
    this.handlers = <EventHandlers<EventsMap>>{};
  }

  /**
   * Emits an event with the provided data to all registered listeners.
   * @param type - The event type to emit.
   * @param data - The data associated with the event.
   */
  protected emit<EventsName extends keyof EventsMap>(type: EventsName, data?: EventsMap[EventsName]): void;
  protected emit<EventsName extends keyof EventsMap>(type: EventsName, data: EventsMap[EventsName]): void {
    if (!EventEmitter.isValidType(type)) {
      return;
    }

    const handlers = this.handlers[type];

    if (!Array.isArray(handlers) || handlers.length === 0) {
      return;
    }

    for (let index = 0; index < handlers.length; index++) {
      const handler = handlers[index];

      if (!isDefined(handler) || !EventEmitter.isValidHandler(handler.handler)) {
        continue;
      }

      const event = this.createEvent(type, handler, data);

      handler.handler(event);

      if (event.once) {
        handler.off();
      }
    }
  }

  /**
   * Checks if there are listeners for a specific event type.
   * If a handler is provided, checks if that specific handler is registered.
   * @param type - The event type to check for listeners.
   * @param handler - The event handler function (optional).
   * @returns True if there are listeners, false otherwise.
   * @protected
   */
  protected hasListener<EventsName extends keyof EventsMap>(
    type: EventsName,
    handler?: EventHandlerFunction<EventsMap[EventsName]>,
  ): boolean {
    if (!EventEmitter.isValidType(type)) {
      return false;
    }

    const handlers = this.handlers[type];

    if (!Array.isArray(handlers) || !handlers.length) {
      return false;
    }

    if (!EventEmitter.isValidHandler(handler)) {
      return true;
    }

    return handlers.some((item) => {
      return item.handler === handler;
    });
  }

  /**
   * Attaches an event handler to the collection for a specific event type.
   * @param type - The event type to attach the handler to.
   * @param eventHandler - The event handler to attach.
   * @private
   */
  private attachEvent<EventsName extends keyof EventsMap>(
    type: EventsName,
    eventHandler: EventHandler<EventsMap[EventsName]>,
  ): void {
    if (!Array.isArray(this.handlers[type])) {
      this.handlers[type] = [eventHandler] as any;

      return;
    }

    this.handlers[type]!.push(eventHandler as any);
  }

  /**
   * Creates an event object with the provided data, type, and handler information.
   * @param type - The event type.
   * @param handler - The event handler object.
   * @param data - The data associated with the event.
   * @returns The created event object.
   * @private
   */
  private createEvent<EventsName extends keyof EventsMap>(
    type: EventsName,
    handler: EventHandler<EventsMap[EventsName]>,
    data: EventsMap[EventsName],
  ): EventType<EventsMap[EventsName], EventsName> {
    return {
      type,
      data,
      once: handler.once,
      removeListener: handler.off,
    };
  }
}
