import { expect, test } from "@playwright/test";

test.describe("test suite 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").first().click();
  });
  test("Find elements by locators test", async ({ page }) => {
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

  test("Find child elements test", async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page
      .locator("nb-card")
      .locator("nb-radio")
      .locator(':text-is("Option 2")')
      .click();
    await page
      .locator("nb-card")
      .getByRole("button", { name: "Sign in" })
      .first()
      .click();
    await page.locator("nb-card").nth(3).getByRole("button").click();
  });

  test("Find parent elements test", async ({ page }) => {
    await page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" })
      .click();
    await page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .getByRole("textbox", { name: "Email" })
      .click();

    await page
      .locator("nb-card")
      .filter({ has: page.locator(".status-danger") })
      .getByRole("textbox", { name: "Password" })
      .click();

    await page
      .locator(':text-is("Using the Grid")')
      .locator("..") // get one level up by using xPath
      .getByRole("textbox", { name: "Email" })
      .click();
  });

  test("Reusing the locators test", async ({ page }) => {
    // easy to refactor this using const
    const basicForm = page.locator("nb-card", { hasText: "Using the Grid" });
    const emailField = basicForm.getByRole("textbox", { name: "Email" });

    await emailField.fill("test@playwright.com");
    await basicForm.getByRole("textbox", { name: "Password" }).fill("nbs123");
    await basicForm.getByRole("button").click();
    await expect(emailField).toHaveValue("test@playwright.com");
  });
});
