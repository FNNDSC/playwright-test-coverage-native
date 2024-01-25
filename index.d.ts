import type { PlaywrightTestConfig as BasePlaywrightTestConfig, test as originalTest } from "@playwright/test";

export type PlaywrightTestConfig<T = {}, W = {}> = Omit<BasePlaywrightTestConfig<T, W>, "use"> & {
  use?: BasePlaywrightTestConfig<T, W>["use"] & {
    coverageDir?: string,
    coverageSrc?: string
  };
};

export function defineConfig(config: PlaywrightTestConfig): PlaywrightTestConfig;
export function defineConfig<T>(config: PlaywrightTestConfig<T>): PlaywrightTestConfig<T>;
export function defineConfig<T, W>(config: PlaywrightTestConfig<T, W>): PlaywrightTestConfig<T, W>;
export function defineConfig(config: PlaywrightTestConfig, ...configs: PlaywrightTestConfig[]): PlaywrightTestConfig;
export function defineConfig<T>(config: PlaywrightTestConfig<T>, ...configs: PlaywrightTestConfig[]): PlaywrightTestConfig<T>;
export function defineConfig<T, W>(config: PlaywrightTestConfig<T, W>, ...configs: PlaywrightTestConfig[]): PlaywrightTestConfig<T, W>;

export const test: typeof originalTest;

export { expect, devices } from "@playwright/test";
