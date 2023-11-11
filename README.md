<div align="center">
  <a href="https://www.npmjs.com/package/@evilkiwi/logger" target="_blank">
    <img src="https://img.shields.io/npm/v/@evilkiwi/logger?style=flat-square" alt="NPM" />
  </a>
  <a href="https://discord.gg/3S6AKZ2GR9" target="_blank">
    <img src="https://img.shields.io/discord/1000565079789535324?color=7289DA&label=discord&logo=discord&logoColor=FFFFFF&style=flat-square" alt="Discord" />
  </a>
  <img src="https://img.shields.io/npm/l/@evilkiwi/logger?style=flat-square" alt="GPL-3.0-only" />
  <h3>Pretty-print utility logger for JS/TS</h3>
</div>

`@evilkiwi/logger` provides a small interface on top of the existing `console` API and includes things such as:

- Automatic code highlighting via \`template literal\` syntax
- High-precision timestamps
- Namespacing and Instanced Loggers
- Enable/disable logging at runtime

## Installation

This package is available via NPM:

```bash
yarn add @evilkiwi/logger

# or

npm install @evilkiwi/logger
```

## Usage

Since version `2.0.0`, there are no global logger exports. Instead, you must always create a logger instance:

```typescript
import { createLogger } from '@evilkiwi/logger';

const loggerA = createLogger({
  name: 'module-a',
  color: '#FF0000',
});
const loggerB = createLogger({
  name: 'module-b',
  color: '#00FF00',
});

loggerA.debug('hello world A!');
loggerA.error('hello world B!');
```
