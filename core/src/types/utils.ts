export type PrimitiveTypes = bigint | boolean | null | number | string | undefined;

export type PlainObjectType = Record<any, PrimitiveTypes | Record<any, unknown>>;

export type TimeoutType = ReturnType<typeof setTimeout>;

export type RegularFunctionType<T = any> = (...parameters: any) => T;
