<template>
    <h1>Open Devtools!</h1>
</template>

<script lang="ts" setup>
    import { createLogger, setNamespace, debug, error } from '@/../..';

    const logger1 = createLogger({
        name: 'logger1',
        color: '#FF0000',
    });
    const logger2 = createLogger({
        name: 'logger2',
    });
    const logger3 = createLogger();

    logger1.debug('test 1');
    logger2.info('test 2');
    logger3.log('test 3');
    debug('test 4');
    error('test 5');

    setNamespace({
        name: 'demo',
        color: '#00FF00',
    });

    logger1.debug('test 6');
    logger2.info('test 7');
    logger3.log('test 8');
    debug('test 9');
    error('test 10');
</script>
