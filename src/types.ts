import type { LogLevel } from './enums';

export type StyleType = 'base' | 'code';
export type Style = `${string}:${string};`;
export type StyleInput = string | Style[];

export interface CreateLoggerProps {
  name?: string | null;
  color?: string | number | null;
  styles?: Partial<Record<StyleType, StyleInput>> | false;
}

export interface LoggerProps {
  name: string | null;
  color: string | number | null;
  styles: Record<StyleType, StyleInput> | false;
}

export interface PrintProps {
  level: LogLevel;
  message: string;
  args?: unknown[];
  call?: 'groupCollapsed' | 'group' | LogLevel;
  color?: string | number;
}

export type LoggerFunction = (message: string, ...args: unknown[]) => void;

export type GroupContext = () => void;

export interface Logger {
  props: Required<CreateLoggerProps>;
  setDisabled: (disabled: boolean) => void;
  disabled: boolean;
  group: (message: string, context?: GroupContext, level?: LogLevel, collapsed?: boolean) => void;
  groupCollapsed: (message: string, context?: GroupContext, level?: LogLevel) => void;
  groupEnd: () => void;
  debug: LoggerFunction;
  log: LoggerFunction;
  info: LoggerFunction;
  warn: LoggerFunction;
  error: LoggerFunction;
}
