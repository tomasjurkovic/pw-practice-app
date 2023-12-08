import { expect, test } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datepickerPage";

test.describe("test suite 1", () => {
  test.beforeEach(async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await page.goto("http://localhost:4200/");
    await navigationPage.formLayoutsPage();
  });

  test("Login with valid credentials via Using The Grid Form test", async ({
    page,
  }) => {
    const formLayoutsPage = new FormLayoutsPage(page);
    formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
      "name",
      "password",
      "Option 1"
    );
    await page.waitForTimeout(2000);
  });

  test("Login with valid credentials and with using remember me checkbox in Horizontal form tab test", async ({
    page,
  }) => {
    const formLayoutsPage = new FormLayoutsPage(page);
    formLayoutsPage.submitUsingTheGridFormWithCredentialsAndCheckbox(
      "name",
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
    const navigationPage = new NavigationPage(page);
    await page.goto("http://localhost:4200/");
    await navigationPage.datepickerPage();
  });
  test("Assert if correct date was selected test", async ({ page }) => {
    const datePickerPage = new DatepickerPage(page);
    datePickerPage.selectCommonDatePickerDateFromToday(50);
  });
  test("Assert if correct date range was selected test", async ({ page }) => {
    const datePickerPage = new DatepickerPage(page);
    datePickerPage.selectDatepickerWithRangeFromToday(50, 100);
    await page.waitForTimeout(2000);
  });
});
