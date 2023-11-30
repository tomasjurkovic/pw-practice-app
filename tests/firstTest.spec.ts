import { test } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("test suite 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
  });
  test("The first test", async ({ page }) => {
    await page.getByText("Form Layouts").click();
  });
  test("The second test", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
});

test.describe("test suite 2", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
  });
  test("The third test", async ({ page }) => {
    await page.getByText("Form Layouts").click();
  });
  test("The fourth test", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
});
