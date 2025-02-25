import { expect } from "@playwright/test";
import { test } from "../test-options";
// needed to be imported here separately / test & expect

test.describe("drag and drop with iFrames", () => {
  test.beforeEach(async ({ page, globalsQaURL }) => {
    await page.goto(globalsQaURL);
  });

  test("drag and drop iFrames element test", async ({ page }) => {
    // first we need to switch into this iFrame

    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');
    const trash = frame.locator("#trash");
    await frame.locator("li", { hasText: "High Tatras 2" }).dragTo(trash);

    // more precise drag and drop iFrames element test
    await frame.locator("li", { hasText: "High Tatras 4" }).hover();
    await page.mouse.down();
    await trash.hover();
    await page.mouse.up();

    // assert they are really inside #trash
    await expect(trash.locator("li h5")).toHaveText([
      "High Tatras 2",
      "High Tatras 4",
    ]);
  });
});
