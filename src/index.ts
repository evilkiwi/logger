import { timestamp } from './helpers';
import { base, code } from './styles';
import { PrintLevel, type Logger, type LoggerOptions, type Namespace, type PrintOptions } from './types';

export function print(opts: PrintOptions) {
  const localStyle = `${base} ${opts.color ? opts.color : ''}`;
  const styles: string[] = [localStyle];
  const level = opts.call ?? `${opts.level}`;
  const startStyle = opts.styled !== false ? '%c' : '';
  const codeRegex = /(`([^`]*)`)+/g;
  let text = opts.message;
  let namespacePrefix = '';
  let loggerPrefix = '';

  if (opts.prefix && opts.prefix.name) {
    loggerPrefix = `${startStyle}[${opts.prefix.name}] `;
    styles.unshift(opts.prefix.color ? `color: ${opts.prefix.color};` : localStyle);
  }

  text = `${namespacePrefix}${loggerPrefix}${startStyle}${text} @ ${timestamp()}`;

  const total = (text.match(codeRegex) ?? []).length;

  for (let i = 0; i < total; i++) {
    styles.push(code, localStyle);
  }

  text = text.replace(codeRegex, `${startStyle}$2${startStyle}`);

  (console as any)[level](text, ...(opts.styled !== false ? styles : []), ...(opts.args ?? []));
}

export function createLogger(options: LoggerOptions = {}) {
  const setDisabled = (isDisabled: boolean) => (disabled = isDisabled);
  let disabled = false;

  const group = (message: string, context?: () => void, collapsed = false, level?: PrintLevel, prefix?: LoggerOptions) => {
    if (disabled) {
      return;
    }

    print({
      level: level ?? PrintLevel.Log,
      message,
      prefix,
      call: collapsed ? 'groupCollapsed' : 'group',
      styled: options.styled,
    });

    if (context) {
      context();
      groupEnd();
    }
  };

  const groupCollapsed = (message: string, context?: () => void) => {
    if (disabled) {
      return;
    }

    group(message, context, true, undefined, options);
  };

  const groupEnd = () => {
    if (disabled) {
      return;
    }

    console.groupEnd();
  };

  const debug = (message: string, ...args: unknown[]) => {
    if (disabled) {
      return;
    }

    print({
      level: PrintLevel.Debug,
      prefix: options,
      message,
      args,
      styled: options.styled,
    });
  };

  const log = (message: string, ...args: unknown[]) => {
    if (disabled) {
      return;
    }

    print({
      level: PrintLevel.Log,
      message,
      args,
      styled: options.styled,
    });
  };

  const info = (message: string, ...args: unknown[]) => {
    if (disabled) {
      return;
    }

    print({
      level: PrintLevel.Info,
      prefix: options,
      message,
      args,
      styled: options.styled,
    });
  };

  const error = (message: string, ...args: unknown[]) => {
    if (disabled) {
      return;
    }

    print({
      level: PrintLevel.Error,
      prefix: options,
      message,
      args,
      color: '#FFFFFF',
      styled: options.styled,
    });
  };

  const logger: Omit<Logger, 'useLogger'> = {
    group,
    groupCollapsed,
    groupEnd,
    debug,
    log,
    info,
    error,
    setDisabled,
    disabled,
  };

  function useLogger() {
    return logger;
  }

  return {
    ...logger,
    useLogger,
  } as Logger;
}

export * from './types';
