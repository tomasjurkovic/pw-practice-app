import { test as base } from "@playwright/test";

export type TestOptions = {
  globalsQaURL: string;
  formLayoutPage: string;
};

export const test = base.extend<TestOptions>({
  globalsQaURL: ["", { option: true }],

  formLayoutPage: [
    async ({ page }, use) => {
      await page.goto("/");
      await page.getByText("Forms").click();
      await page.getByText("Form Layouts").click();
      await use("");
    },
    { auto: true },
  ],
});
