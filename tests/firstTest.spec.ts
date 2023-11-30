import { test } from "@playwright/test";

test.describe("test suite 1", () => {
  test("The first test", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });
  test("The second test", () => {});
});

test.describe("test suite 2", () => {
  test("The third test", () => {});
  test("The fourth test", () => {});
});
