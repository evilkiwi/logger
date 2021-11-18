import type { Logger, LoggerOptions, Namespace, PrintOptions } from './types';
import { timestamp } from './helpers';
import { PrintLevel } from './types';

let namespace: Namespace = {
    name: '',
};
let styled = true;

export const setNamespace = (newNamespace: Namespace) => namespace = newNamespace;
export const setStyled = (isStyled: boolean) => styled = isStyled;

const codeRegex = /(`([^`]*)`)+/g;
const style = `
    font-size: 11px;
    font-weight: normal;
`;
const code = `
    display: inline-block;
    font-family: ui-monospace, "Cascadia Mono", "Segoe UI Mono", "Liberation Mono", Menlo, Monaco, Consolas, monospace;
    padding: 1px 4px;
    font-size: 10px;
    background-color: #E92063;
    font-weight: bold;
    color: #111111;
    border-radius: 3px;
    vertical-align: top;
`;

const print = (opts: PrintOptions) => {
    const localStyle = `${style} ${opts.color ? opts.color : ''}`;
    const styles: string[] = [localStyle];
    const level = opts.call ?? `${opts.level}`;
    const startStyle = styled ? '%c' : '';
    let loggerPrefix = opts.prefix ?? '';
    let namespacePrefix = '';
    let text = opts.message;

    loggerPrefix = loggerPrefix.length > 0 ? `[${loggerPrefix}] ` : '';

    if (namespace.name.length > 0) {
        namespacePrefix = `${startStyle}[${namespace.name}] `;
        styles.unshift(namespace.color ? `color: ${namespace.color};` : localStyle);
    }

    text = `${namespacePrefix}${startStyle}${loggerPrefix}${text} @ ${timestamp()}`;

    const total = (text.match(codeRegex) ?? []).length;

    for (let i = 0; i < total; i++) {
        styles.push(code, localStyle);
    }

    text = text.replace(codeRegex, `${startStyle}$2${startStyle}`);

    (console as any)[level](text, ...(styled ? styles : []), ...(opts.args ?? []));
};

export const createLogger = (options: LoggerOptions = {}): Logger => {
    const group = (message: string, context?: () => void, collapsed = false, level?: PrintLevel, prefix?: string) => {
        print({
            level: level ?? PrintLevel.Log,
            message,
            prefix,
            call: collapsed ? 'groupCollapsed' : 'group',
        });

        if (context) {
            context();
            groupEnd();
        }
    };
    const groupCollapsed = (message: string, context?: () => void) => group(message, context, true, undefined, options.name);
    const groupEnd = () => console.groupEnd();
    const debug = (message: string, ...args: unknown[]) => print({
        level: PrintLevel.Debug,
        prefix: options.name,
        message,
        args,
    });
    const log = (message: string, ...args: unknown[]) => print({
        level: PrintLevel.Log,
        message,
        args,
    });
    const info = (message: string, ...args: unknown[]) => print({
        level: PrintLevel.Info,
        prefix: options.name,
        message,
        args,
    });
    const error = (message: string, ...args: unknown[]) => print({
        level: PrintLevel.Error,
        prefix: options.name,
        message,
        args,
        color: '#FFFFFF',
    });

    const logger: Omit<Logger, 'useLogger'> = {
        group,
        groupCollapsed,
        groupEnd,
        debug,
        log,
        info,
        error,
    };

    function useLogger() {
        return logger;
    }

    return {
        ...logger,
        useLogger,
    };
};
