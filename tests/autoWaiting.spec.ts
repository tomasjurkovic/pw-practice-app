import { expect, test } from "@playwright/test";

test.describe("test suite 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://www.uitestingplayground.com/ajax");
    await page.getByText("Button Triggering AJAX Request").click();
  });
  test("Find elements by locators test", async ({ page }) => {
    const successButton = page.locator(".bg-success");
    await successButton.click();
    const text = await successButton.textContent();
    // const text = await successButton.allTextContents();
    expect(text).toContain("Data loaded with AJAX get request.");
  });

  test("Alternative waits test", async ({ page }) => {
    const successButton = page.locator(".bg-success");

    // wait for element;
    await page.waitForSelector(".bg-success");
    await successButton.click();

    // wait for particular API response:
    await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

    // wait for all network calls to be completed (NOT RECOMMENDED):
    // await page.waitForLoadState("networkidle");
    // if some API calls get stuck, all test will fail

    const text = await successButton.textContent();
    expect(text).toContain("Data loaded with AJAX get request.");
  });

  test("Timeouts", async ({ page }) => {
    // test.slow() // possible to run it in slow mode with longer timeouts
    const successButton = page.locator(".bg-success");
    await successButton.click();
  });
});
