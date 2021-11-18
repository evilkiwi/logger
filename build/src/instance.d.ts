import type { Logger, LoggerOptions, Namespace } from './types';
export declare const setNamespace: (newNamespace: Namespace) => Namespace;
export declare const setStyled: (isStyled: boolean) => boolean;
export declare const createLogger: (options?: LoggerOptions) => Logger;
