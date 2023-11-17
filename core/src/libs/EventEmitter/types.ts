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
