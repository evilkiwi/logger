export const logLevel = {
  log: 'log',
  debug: 'debug',
  error: 'error',
  info: 'info',
  warn: 'warn',
} as const;

export type LogLevel = keyof typeof logLevel;
