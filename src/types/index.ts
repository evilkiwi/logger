export enum PrintLevel {
  Log = 'log',
  Debug = 'debug',
  Error = 'error',
  Info = 'info',
  Store = 'store',
}

export interface Namespace {
  name: string;
  color?: string;
}

export interface PrintOptions {
  level: PrintLevel;
  prefix?: {
    name?: string;
    color?: string;
  };
  message: string;
  args?: any[];
  call?: string;
  color?: string;
}

export interface LoggerOptions {
  name?: string;
  color?: string;
}

export type LoggerFunction = (message: string, ...args: unknown[]) => void;

export interface Logger {
  group: (message: string, context?: () => void, collapsed?: boolean, level?: PrintLevel, prefix?: LoggerOptions) => void;
  groupCollapsed: (message: string, context?: () => void) => void;
  groupEnd: () => void;
  debug: LoggerFunction;
  log: LoggerFunction;
  info: LoggerFunction;
  error: LoggerFunction;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  useLogger: () => Omit<Logger, 'useLogger'>;
}
