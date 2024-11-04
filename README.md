# playwright-test-coverage-native

[![License](https://img.shields.io/npm/l/playwright-test-coverage-native)](https://github.com/FNNDSC/playwright-test-coverage-native/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/playwright-test-coverage-native)](https://www.npmjs.com/package/playwright-test-coverage-native)

Measure test coverage with Playwright.
Its only dependency is `@playwright/test` — unlike its [alternatives](#alternatives), `playwright-test-coverage-native` uses Playwright's 
[built-in coverage functionality](https://playwright.dev/docs/api/class-coverage) without [Istanbul](https://istanbul.js.org/).

## Installation

Using NPM:

```shell
npm i -D playwright-test-coverage-native
```

Using [PNPM](https://pnpm.io/):

```shell
pnpm i -D playwright-test-coverage-native
```

## Configuration

Add `coverageDir` to `playwright.config.ts` to set where coverage data should be written to.
For example,

```ts
import { defineConfig, devices } from "playwright-test-coverage-native";

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        coverageDir: './coverage/tmp',  // output location for coverage data
        coverageSrc: './src',           // filter coverage data for only files in ./src (optional)
        // one of: '@fs', 'localhosturl'. Sadly you'll just have to play around to see which one works
        coverageSourceMapHandler: '@fs'
      },
    },
  ],
});
```

> [!NOTE]  
> Coverage APIs are only supported on Chromium-based browsers.

## Usage

`playwright-test-coverage-native` is a drop-in replacement for `@playwright/test`. Edit the import of your test files like this:

```diff
-import { test, expect } from '@playwright/test';
+import { test, expect } from 'playwright-test-coverage-native';
```

If you're brave, you can do the changes in bulk:

```shell
# using GNU coreutils
find -type f -name '*.test.?s' -exec sed -i -e 's#@playwright/test#playwright-test-coverage-native#' \;
```

## Post-processing

Install [c8](https://www.npmjs.com/package/c8).

After running `playwright test -c playwright.config.ts`,
run `c8 report` to print a summary of the coverage.
`c8 report` is also used to convert to various formats,
see `c8 report --help` for more options.

## Alternatives

> [!NOTE]  
> V8 code coverage can be inaccurate due to JavaScript code transformation and source maps,
> in which case alternatives (which use istanbul) may be preferable.

- https://github.com/anishkny/playwright-test-coverage (requires [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul) instrumentation)
- https://github.com/mxschmitt/playwright-test-coverage (requires [vite-plugin-istanbul](https://github.com/ifaxity/vite-plugin-istanbul))
