import { expect, test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";

test.describe("test suite 1", () => {
  test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);
    await page.goto("/");
    await pm.onNavigationPage().formLayoutsPage();
  });

  test("Login with valid credentials via Using The Grid Form test", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(
      "name",
      "password",
      "Option 1"
    );
    // create screenshot of whole screen:
    await page.screenshot({ path: "screenshots/formsLayoutPage.png" });
    // create screenshot of single element only:
    await page
      .locator("nb-card", { hasText: "Inline form" })
      .screenshot({ path: "screenshots/inlineForm.png" });
    await page.waitForTimeout(2000);
  });

  test("Login with valid credentials and with using remember me checkbox in Horizontal form tab test", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    const randomFullName = faker.person.fullName();
    console.log(randomFullName);
    pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndCheckbox(
      randomFullName,
      "password",
      true
    );
    await page.waitForTimeout(2000);
  });
  test("Input fields test", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("demo@email.com");
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("test@new.com", {
      delay: 500,
    });

    // generic assertions
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("test@new.com");

    // locator assertions
    await expect(usingTheGridEmailInput).toHaveValue("test@new.com");
  });
});

test.describe("Test Suite 2", () => {
  test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);
    await page.goto("/");
    await pm.onNavigationPage().datepickerPage();
  });
  test("Assert if correct date was selected test", async ({ page }) => {
    const pm = new PageManager(page);
    pm.onDatepickerPage().selectCommonDatePickerDateFromToday(50);
  });
  test("Assert if correct date range was selected test", async ({ page }) => {
    const pm = new PageManager(page);
    pm.onDatepickerPage().selectDatepickerWithRangeFromToday(50, 100);
    await page.waitForTimeout(2000);
  });
});
