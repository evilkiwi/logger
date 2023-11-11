<template>
  <h1>Open Devtools!</h1>
</template>

<script lang="ts" setup>
import { createLogger } from '@/../..';

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
logger1.debug('test 4');
logger2.info('test 5');
logger3.log('test 6');
</script>
