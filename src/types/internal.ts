/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { ActionEventCallRequest, Service } from '@busy-hour/blaze';
import type { RecordString, RecordUnknown } from './helper';
import type {
  ExtractActionHandler,
  ExtractActionValidator,
  ExtractEventValidator,
} from './extractor';

export type ServiceNameExtractor<T extends Service> =
  NonNullable<T['version']> extends number
    ? NonNullable<T['name']> extends string
      ? `v${T['version']}.${T['name']}`
      : `v${T['version']}`
    : NonNullable<T['name']> extends string
      ? `${T['name']}`
      : never;

export type ActionsExtractor<T extends Service> = {
  [A in keyof T['actions'] as `${ServiceNameExtractor<T>}.${A extends string ? A : never}`]: ActionEventCallRequest<
    ExtractActionValidator<T, A, 'header'>,
    ExtractActionValidator<T, A, 'params'>,
    ExtractActionValidator<T, A, 'query'>,
    ExtractActionValidator<T, A, 'body'>,
    ExtractActionHandler<T, A>
  >;
};

export type EventsExtractor<T extends Service> = {
  [E in keyof T['events'] as `${ServiceNameExtractor<T>}.${E extends string ? E : never}`]: ActionEventCallRequest<
    RecordString,
    RecordUnknown,
    RecordUnknown,
    ExtractEventValidator<T, E>,
    unknown
  >;
};
