import { createLogger } from './instance';

const {
    group, groupCollapsed, groupEnd,
    debug, log, info, error,
    useLogger,
} = createLogger();

export {
    group, groupCollapsed, groupEnd,
    debug, log, info, error,
    useLogger,
};
export * from './instance';
export * from './types';
