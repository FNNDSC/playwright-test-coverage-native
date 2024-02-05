import type { PlaywrightTestConfig as BasePlaywrightTestConfig, test as originalTest } from "@playwright/test";

type CoverageOptions = {
  coverageDir?: string,
  coverageSrc?: string,
  coverageSourceMapHandler?: "@fs" | "localhosturl"
};

export type PlaywrightTestConfig<T = {}, W = {}> = BasePlaywrightTestConfig<T, W & CoverageOptions>;

export function defineConfig(config: PlaywrightTestConfig): PlaywrightTestConfig;
export function defineConfig<T>(config: PlaywrightTestConfig<T>): PlaywrightTestConfig<T>;
export function defineConfig<T, W>(config: PlaywrightTestConfig<T, W>): PlaywrightTestConfig<T, W>;
export function defineConfig(config: PlaywrightTestConfig, ...configs: PlaywrightTestConfig[]): PlaywrightTestConfig;
export function defineConfig<T>(config: PlaywrightTestConfig<T>, ...configs: PlaywrightTestConfig[]): PlaywrightTestConfig<T>;
export function defineConfig<T, W>(config: PlaywrightTestConfig<T, W>, ...configs: PlaywrightTestConfig[]): PlaywrightTestConfig<T, W>;

export const test: typeof originalTest;

export { expect, devices } from "@playwright/test";
