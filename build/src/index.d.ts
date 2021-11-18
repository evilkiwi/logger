import type { PrintLevel, LoggerFunction, Logger } from './types';
declare const group: (message: string, context?: (() => void) | undefined, collapsed?: boolean | undefined, level?: PrintLevel | undefined, prefix?: string | undefined) => void, groupCollapsed: (message: string, context?: (() => void) | undefined) => void, groupEnd: () => void, debug: LoggerFunction, log: LoggerFunction, info: LoggerFunction, error: LoggerFunction, useLogger: () => Omit<Logger, "useLogger">;
export { group, groupCollapsed, groupEnd, debug, log, info, error, useLogger, };
export * from './instance';
export * from './types';
