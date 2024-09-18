/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  Actions,
  Events,
  Service,
  z,
  AnyAction,
  AnyEvent,
  AnyValidator,
  AnyActionHook,
  AnyAfterHook,
  AnyAfterHookHandler,
  ActionEventCallRequest,
  ActionCallResult,
} from '@busy-hour/blaze';
import type {
  AnyRootConfig,
  BuildProcedure,
  ProcedureType,
} from '@trpc/server';
import type { Random, RecordString, RecordUnknown } from './helper';

export type ExtractActionValidator<
  S extends Service,
  A extends keyof S['actions'],
  V extends keyof AnyValidator,
  D = V extends 'body'
    ? unknown
    : V extends 'headers'
      ? RecordString
      : RecordUnknown,
> =
  NonNullable<S['actions']> extends Actions
    ? NonNullable<S['actions']>[A] extends AnyAction
      ? NonNullable<
          NonNullable<NonNullable<S['actions']>[A]>['validator']
        > extends AnyValidator
        ? NonNullable<
            NonNullable<
              NonNullable<NonNullable<S['actions']>[A]>['validator']
            >[V]
          > extends z.ZodSchema
          ? z.input<
              NonNullable<
                NonNullable<
                  NonNullable<NonNullable<S['actions']>[A]>['validator']
                >[V]
              >
            >
          : D
        : D
      : D
    : D;

export type ExtractActionHandler<
  S extends Service,
  A extends keyof S['actions'],
> =
  NonNullable<S['actions']> extends Actions
    ? NonNullable<S['actions']>[A] extends AnyAction
      ? NonNullable<
          NonNullable<NonNullable<S['actions']>[A]>['hooks']
        > extends AnyActionHook
        ? NonNullable<
            NonNullable<
              NonNullable<NonNullable<S['actions']>[A]>['hooks']
            >['after']
          > extends AnyAfterHook
          ? NonNullable<
              NonNullable<
                NonNullable<NonNullable<S['actions']>[A]>['hooks']
              >['after']
            > extends Array<infer U extends AnyAfterHook>
            ? U extends AnyAfterHookHandler
              ? Awaited<ReturnType<U>>
              : Awaited<
                  ReturnType<
                    NonNullable<NonNullable<S['actions']>[A]>['handler']
                  >
                >
            : NonNullable<
                  NonNullable<
                    NonNullable<NonNullable<S['actions']>[A]>['hooks']
                  >['after']
                > extends AnyAfterHookHandler
              ? Awaited<
                  ReturnType<
                    NonNullable<
                      NonNullable<
                        NonNullable<NonNullable<S['actions']>[A]>['hooks']
                      >['after']
                    >
                  >
                >
              : Awaited<
                  ReturnType<
                    NonNullable<NonNullable<S['actions']>[A]>['handler']
                  >
                >
          : Awaited<
              ReturnType<NonNullable<NonNullable<S['actions']>[A]>['handler']>
            >
        : Awaited<
            ReturnType<NonNullable<NonNullable<S['actions']>[A]>['handler']>
          >
      : unknown
    : unknown;

export type ExtractEventValidator<
  S extends Service,
  E extends keyof S['events'],
> =
  NonNullable<S['events']> extends Events
    ? NonNullable<S['events']>[E] extends AnyEvent
      ? NonNullable<
          NonNullable<NonNullable<S['events']>[E]>['validator']
        > extends z.ZodSchema
        ? z.input<
            NonNullable<NonNullable<NonNullable<S['events']>[E]>['validator']>
          >
        : unknown
      : unknown
    : unknown;

export type ProcedureExtractor<
  P extends ProcedureType,
  CR extends ActionEventCallRequest<Random, Random, Random, Random, Random>,
> = BuildProcedure<
  P,
  {
    _config: AnyRootConfig;
    _ctx_out: Random;
    // eslint-disable-next-line no-use-before-define
    _input_in: Omit<CR, 'result'>;
    // eslint-disable-next-line no-use-before-define
    _input_out: Omit<CR, 'result'>;
    _meta: Random;
    // eslint-disable-next-line no-use-before-define
    _output_in: ActionCallResult<CR['result']>;
    // eslint-disable-next-line no-use-before-define
    _output_out: ActionCallResult<CR['result']>;
  },
  // eslint-disable-next-line no-use-before-define
  ActionCallResult<CR['result']>
>;
