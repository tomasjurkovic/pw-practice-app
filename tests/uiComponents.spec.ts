import { expect, test } from "@playwright/test";

test.describe("test suite 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
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
