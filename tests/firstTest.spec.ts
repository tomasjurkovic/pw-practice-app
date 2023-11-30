import { test } from "@playwright/test";

test.describe("test suite 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
  });
  test("Find elements by locators test", async ({ page }) => {
    await page.getByText("Form Layouts").first().click();

    // by tag:
    page.locator("input");
    // by ID:
    page.locator("#inputEmail1");
    // by class value
    page.locator(".shape-rectangle");
    // by attribute:
    page.locator('[placeholder="Email"]');
    // by Class value (full):
    page.locator(
      '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
    );
    // combine different selectors {tag & attribute}
    page.locator('input[placeholder="Email"]');
    // by partial text match:
    page.locator(':text("Using")');
    // by exact text match:
    page.locator(':text-is("Using the Grid")');
  });
  test("User facing locators test", async ({ page }) => {
    await page.getByText("Form Layouts").first().click();
    await page
      .getByRole("textbox", { name: "Email" })
      .first()
      .fill("Hello@world.net");
    await page.getByLabel("Email").first().click();
    await page.getByPlaceholder("Jane Doe").click();
    await page.getByText("Using the Grid").click();
    await page.getByTitle("IoT Dashboard");
    await page.getByTestId("SignIn").click();
  });
});
