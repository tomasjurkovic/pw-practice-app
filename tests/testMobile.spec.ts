import { test } from "@playwright/test";

test("Input fields test", async ({ page }) => {
  await page.goto("/");
  await page.locator("g[data-name$='menu-2']").click();
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").first().click();

  const usingTheGridEmailInput = page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" });

  await usingTheGridEmailInput.fill("demo@email.com");
  await usingTheGridEmailInput.clear();
  await usingTheGridEmailInput.pressSequentially("test@new.com", {
    delay: 500,
  });
});
