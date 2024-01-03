import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./test-options";

require("dotenv").config();

export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 60000,

  expect: {
    timeout: 2000,
  },
  retries: 1,
  reporter: "html",

  use: {
    baseURL: "http://localhost:4200/",
    // for other projects such as autoWaiting & dragAndDrop
    // which uses different URLS I created test-options file
    // and here I can define substitute of base URL / globalsQaURL:
    globalsQaURL: "http://www.globalsqa.com/draganddrop", // used value from dragANdDrop test

    trace: "on-first-retry",
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: "off",
      size: {
        width: 1920,
        height: 1080,
      },
    },
    // here I put possible video configuration if videos are needed
  },

  projects: [
    // here I can insert different enviroments with their baseURL like this:
    {
      name: "dev",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:4201",
      },
    },
    {
      name: "qa",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:4202",
      },
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
