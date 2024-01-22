# playwright-test-coverage-native

Measure test coverage with Playwright.
Its only dependency is `@playwright/test` — unlike its [alternatives](#alternatives), `playwright-test-coverage-native` uses Playwright's 
[built-in coverage functionality](https://playwright.dev/docs/api/class-coverage) without [Istanbul](https://istanbul.js.org/).

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
        coverageSrc: './src'            // filter coverage data for only files in ./src (optional)
      },
    },
  ],
});
```

> [!NOTE]  
> Coverage APIs are only supported on Chromium-based browsers.

## Usage

Install [c8](https://www.npmjs.com/package/c8).

After running `playwright test -c playwright.config.ts`,
run `c8 report` to print a summary of the coverage.
`c8 report` is also used to convert to various formats,
see `c8 report --help` for more options.

## Alternatives

- https://github.com/anishkny/playwright-test-coverage (requires [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul) instrumentation)
- https://github.com/mxschmitt/playwright-test-coverage (requires [vite-plugin-istanbul](https://github.com/ifaxity/vite-plugin-istanbul))
