import { type LogLevel, logLevel } from './enums';
import { normalizeColor, normalizeStyle, timestamp } from './helpers';
import { styles } from './styles';
import type { CreateLoggerProps, Logger, LoggerProps, PrintProps } from './types';

export function createLogger(props?: CreateLoggerProps) {
  const useProps: LoggerProps = {
    name: null,
    color: null,
    ...props,
    styles:
      props?.styles === false
        ? false
        : {
            ...styles,
            ...(props?.styles ?? {}),
          },
  };

  const setDisabled = (isDisabled: boolean) => {
    disabled = isDisabled;
  };
  let disabled = false;

  function print(options: PrintProps) {
    if (disabled) {
      return;
    }

    const localStyle =
      useProps.styles !== false ? `${normalizeStyle(useProps.styles.base)} ${options.color ? `color: ${normalizeColor(options.color)};` : ''}` : '';
    const startStyle = useProps.styles !== false ? '%c' : '';
    const styles: string[] = [localStyle];
    let loggerPrefix = '';

    if (typeof useProps.name === 'string' && useProps.name.length > 0) {
      loggerPrefix = `${startStyle}[${useProps.name}] `;
      useProps.styles !== false && styles.unshift(`${localStyle} ${useProps.color !== null ? `color: ${normalizeColor(useProps.color)};` : ''}`);
    }

    let message = `${loggerPrefix}${startStyle}${options.message} @ ${timestamp()}`;

    if (useProps.styles !== false) {
      const codeRegex = /(`([^`]*)`)+/g;
      const total = (message.match(codeRegex) ?? []).length;

      for (let i = 0; i < total; i++) {
        styles.push(normalizeStyle(useProps.styles.code), localStyle);
      }

      message = message.replace(codeRegex, `${startStyle}$2${startStyle}`);
    }

    console[options.call ?? options.level](message, ...(useProps.styles !== false ? styles : []), ...(options.args ?? []));
  }

  function log(message: string, ...args: unknown[]) {
    print({
      level: logLevel.log,
      message,
      args,
    });
  }

  function debug(message: string, ...args: unknown[]) {
    print({
      level: logLevel.debug,
      message,
      args,
    });
  }

  function info(message: string, ...args: unknown[]) {
    print({
      level: logLevel.info,
      message,
      args,
    });
  }

  function warn(message: string, ...args: unknown[]) {
    print({
      level: logLevel.warn,
      message,
      args,
      color: '#FFFFFF',
    });
  }

  function error(message: string, ...args: unknown[]) {
    print({
      level: logLevel.error,
      message,
      args,
      color: '#FFFFFF',
    });
  }

  function group(message: string, context?: () => void, level?: LogLevel, collapsed = false) {
    if (disabled) {
      return;
    }

    print({
      level: level ?? logLevel.log,
      message,
      call: collapsed ? 'groupCollapsed' : 'group',
    });

    if (context) {
      context();
      groupEnd();
    }
  }

  function groupCollapsed(message: string, context?: () => void, level?: LogLevel) {
    group(message, context, level, true);
  }

  function groupEnd() {
    console.groupEnd();
  }

  const logger: Logger = {
    props: useProps,
    setDisabled,
    disabled,
    group,
    groupCollapsed,
    groupEnd,
    log,
    debug,
    info,
    warn,
    error,
  };

  return logger;
}

export * from './enums';
export * from './styles';
export * from './types';
