const fsPromises = require("node:fs/promises");
const path = require("node:path");
const { test: base, defineConfig, expect, devices } = require("playwright/test");

const PROCESSORS = {
  "@fs": (coverageSrc, coverage) => {
    const coverageSrcResolved = coverageSrc ? path.resolve(coverageSrc) : "";
    return coverage
      .filter((entry) => entry.url.includes(coverageSrcResolved))
      .map((entry) => {
        return {
          ...entry,
          url: entry.url.replace(/^.+@fs/, "file://")
        };
      });
  },
  "localhosturl": (coverageSrc, coverage) => {
    const coverageSrcPrefixed = "file://" + coverageSrc;
    return coverage
        .map((entry) => {
          return {
            ...entry,
            url: entry.url.replace(/^http:\/\/localhost:\d+/, "file://.")
          };
        })
        .filter((entry) => entry.url.startsWith(coverageSrcPrefixed));
  },
  "basic": (coverageSrc, coverage) => {
    return coverage.filter((entry) => entry.url.includes(coverageSrc || ""));
  }
};

const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const { coverageDir, coverageSrc, coverageSourceMapHandler } = testInfo.project.use;
    if (coverageDir === undefined) {
      await use(page);
      return;
    }

    await page.coverage.startJSCoverage();
    await use(page);

    const coverage = await page.coverage.stopJSCoverage();
    const srcCoverage = PROCESSORS[coverageSourceMapHandler || "basic"](coverageSrc, coverage);
    await fsPromises.mkdir(coverageDir, { recursive: true });
    const testTitle = testInfo.title.replaceAll("/", "_");
    await fsPromises.writeFile(
      path.join(coverageDir, `${testTitle}.json`),
      JSON.stringify({ result: srcCoverage }, null, 2),
    );
  },
});

module.exports = { test, expect, defineConfig, devices };
