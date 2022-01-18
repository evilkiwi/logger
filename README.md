<div align="center">
    <a href="https://www.npmjs.com/package/@tnotifier/logger" target="_blank">
        <img src="https://img.shields.io/npm/v/@tnotifier/logger?style=flat-square" alt="NPM" />
    </a>
    <a href="https://discord.gg/XMrHXtN" target="_blank">
        <img src="https://img.shields.io/discord/123906549860139008?color=7289DA&label=discord&logo=discord&logoColor=FFFFFF&style=flat-square" alt="Discord" />
    </a>
    <img src="https://img.shields.io/npm/l/@tnotifier/logger?style=flat-square" alt="Apache-2.0" />
    <h3>Pretty-print utility logger for JS/TS</h3>
</div>

`@tnotifier/logger` provides a small interface on top of the existing `console` API and includes things such as:

- Automatic code highlighting via \`template literal\` syntax
- High-precision timestamps
- Namespacing and Instanced Loggers
- Enable/disable logging at runtime

![Preview](https://cdn.tnotifier.app/open-source/logger.png)

## Installation

This package is available via NPM:

```bash
yarn add @tnotifier/logger

# or

npm install @tnotifier/logger
```

## Usage

By default, `@tnotifier/logger` exports traditional logging methods using a shared logger instance. For example:

```typescript
import { debug, error } from '@tnotifier/logger';

try {
    await something();
    debug('success!');
} catch (e) {
    error('failure!', e);
}
```

However, if you'd like to add namespaces and use multiple logger instances within your application, you can instead instantiate a new Logger:

```typescript
import { createLogger } from '@tnotifier/logger';

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

You can also set a global namespace for all Logger instances created via your App. This can be useful if your console displays output from multiple systems, for example an Electron App or when using iFrames.

```typescript
import { setNamespace } from '@tnotifier/logger';

setNamespace({
    name: 'website',
    color: '#0000FF',
});
```

This will be pre-pended to all logging that passes through `@tnotifier/logger`, regardless of whether it was instanced.

## To-do

- Remove side effects to enable tree shaking
