export type EventHandlerFunction<DataType> = (event: EventType<DataType>) => void;

export type EventHandler<DataType> = {
  handler: EventHandlerFunction<DataType>;
  off: () => void;
  once: boolean;
};

export interface EventType<DataType, EventsName = any> {
  type: EventsName;
  data: DataType;
  removeListener: () => void;
  once: boolean;
}

export type EventHandlers<EventsMap extends Record<any, any>> = Record<
  keyof EventsMap,
  EventHandler<EventsMap[keyof EventsMap]>[] | undefined
>;
