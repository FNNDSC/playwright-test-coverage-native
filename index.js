const fsPromises = require("node:fs/promises");
const path = require("node:path");
const { test: base, defineConfig, expect, devices } = require("playwright/test");


const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const { coverageDir, coverageSrc, coverageSourceMapHandler } = testInfo.project.use;
    if (coverageDir === undefined) {
      await use(page);
      return;
    }

    const coverageSrcResolved = coverageSrc ? path.resolve(coverageSrc) : "";
    let urlReplacer = (url) => url;
    if (coverageSourceMapHandler === "@fs") {
      urlReplacer = (url) => url.replace(/^.+@fs/, "");
    } else if (coverageSourceMapHandler === "localhosturl") {
      const absPath = path.resolve(".");
      urlReplacer = (url) => url.replace(/http:\/\/localhost:\d+/, absPath);
    }

    await page.coverage.startJSCoverage();
    await use(page);

    const coverage = await page.coverage.stopJSCoverage();
    const srcCoverage = coverage.map((entry) => {
      return { ...entry, url: urlReplacer(entry.url) };
    })
      .filter((entry) => entry.url.startsWith(coverageSrcResolved));
    await fsPromises.mkdir(coverageDir, { recursive: true });
    const testTitle = testInfo.title.replaceAll("/", "_");
    await fsPromises.writeFile(
      path.join(coverageDir, `${testTitle}.json`),
      JSON.stringify({ result: srcCoverage }, null, 2),
    );
  },
});

module.exports = { test, expect, defineConfig, devices };
