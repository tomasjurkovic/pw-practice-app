import { expect, test } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";

test.describe("test suite 1", () => {
  test.beforeEach(async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await page.goto("http://localhost:4200/");
    await navigationPage.formLayoutsPage();
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

  test("radio buttons test", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    // option one:
    // await usingTheGridForm.getByLabel("Option 1").check({ force: true });
    // option two:
    await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });

    // asserion if field is checked:
    const radioStatus = await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .isChecked();
    expect(radioStatus).toBeTruthy();
    // another option:
    await expect(
      usingTheGridForm.getByRole("radio", { name: "Option 1" })
    ).toBeChecked();

    // check second radio button:
    await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });

    // validate option 2 is checked
    expect(
      await usingTheGridForm
        .getByRole("radio", { name: "Option 2" })
        .isChecked()
    ).toBeTruthy();

    // validate option 1 is nit checked anymore:
    expect(
      await usingTheGridForm
        .getByRole("radio", { name: "Option 1" })
        .isChecked()
    ).toBeFalsy();
  });
});

test.describe("test suite 2", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
  });
  test("checkboxes", async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await navigationPage.toastrPage();
    await page
      .getByRole("checkbox", { name: "Hide on click" })
      .uncheck({ force: true });

    await page
      .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
      .check({ force: true });

    // check all checkboxes:
    const allCheckboxes = page.getByRole("checkbox");
    // verify all are checked
    for (const checkbox of await allCheckboxes.all()) {
      // allCheckboxes.all() will do an array from the list
      await checkbox.check({ force: true });
      expect(await checkbox.isChecked()).toBeTruthy();
    }
    // verify all are unchecked
    for (const checkbox of await allCheckboxes.all()) {
      await checkbox.uncheck({ force: true });
      expect(await checkbox.isChecked()).toBeFalsy();
    }
  });
});
