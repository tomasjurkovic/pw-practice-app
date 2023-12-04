import { expect, test } from "@playwright/test";

test.describe("test suite 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:63909/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").first().click();
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
    await page.goto("http://localhost:63909/");
  });
  test("checkboxes", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();
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

  test("dropdowns", async ({ page }) => {
    const dropdownMenu = page.locator("ngx-header nb-select");
    await dropdownMenu.click();

    // usually the best way to interact with dropdowns:
    page.getByRole("list"); // when the list has a UL tag
    page.getByRole("listitem"); // when the list has a LI tag

    const optionList = page.locator("nb-option-list nb-option"); // provides a list of items

    // check if all expected list item in the dropdown are present:
    await expect(optionList).toHaveText([
      "Light",
      "Dark",
      "Cosmic",
      "Corporate",
    ]);

    // select "Cosmic" option:
    // await page.getByText("Cosmic").click();
    await optionList.filter({ hasText: "Cosmic" }).click({ force: true });

    // verify header background color is correct one for cosmic theme:
    const header = page.locator("nb-layout-header");
    await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");

    // validate all theme background-colors according to selected theme
    const colors = {
      Light: "rgb(255, 255, 255)",
      Dark: "rgb(34, 43, 69)",
      Cosmic: "rgb(50, 50, 89)",
      Corporate: "rgb(255, 255, 255)",
    };

    await dropdownMenu.click();
    for (const color in colors) {
      await optionList.filter({ hasText: color }).click();
      await expect(header).toHaveCSS("background-color", colors[color]);
      if (color != "Corporate") await dropdownMenu.click();
    }
  });

  test("tooltips", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Tooltip").click();

    const tooltipCard = page.locator("nb-card", {
      hasText: "Tooltip Placements",
    });

    await tooltipCard.getByRole("button", { name: "Top" }).hover();
    // page.getByRole('tooltip') // only works if you have a role tooltip created

    const tooltip = await page.locator("nb-tooltip").textContent();
    expect(tooltip).toEqual("This is a tooltip");
  });

  test("dialog boxes", async ({ page }) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    page.on("dialog", (dialog) => {
      expect(dialog.message()).toEqual("Are you sure you want to delete?");
      dialog.accept();
    });
    await page
      .getByRole("table")
      .locator("tr", { hasText: "mdo@gmail.com" })
      .locator(".nb-trash")
      .click({ force: true });

    await expect(page.locator("table tr").first()).not.toHaveText(
      "mdo@gmail.com"
    );
  });

  test("tables - modify age of the third user found by an email", async ({
    page,
  }) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    const thirdRow = page
      .getByRole("table")
      .locator("tr", { hasText: "twitter@outlook.com" });

    await thirdRow.locator(".nb-edit").click({ force: true });
    await page.locator("input-editor").getByPlaceholder("Age").clear();
    await page.locator("input-editor").getByPlaceholder("Age").fill("25");
    await page.locator(".nb-checkmark").click({ force: true });

    await expect(thirdRow).toContainText("25");
  });
});
