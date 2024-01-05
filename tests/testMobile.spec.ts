import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test("Input fields test", async ({ page }, testInfo) => {
  if (testInfo.project.name === "mobile") {
    await page.locator(".sidebar-toggle").click();
  }
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").first().click();
  if (testInfo.project.name === "mobile") {
    await page.locator(".sidebar-toggle").click();
  }

  const usingTheGridEmailInput = page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" });

  await usingTheGridEmailInput.fill("demo@email.com");
  await usingTheGridEmailInput.clear();
  await usingTheGridEmailInput.pressSequentially("test@new.com", {
    delay: 500,
  });
});
