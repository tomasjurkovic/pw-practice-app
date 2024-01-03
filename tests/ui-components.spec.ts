import { expect, test } from "@playwright/test";

test.describe("test suite 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
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
    await page.goto("/");
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

  test("tables - modify email of the  user found by an ID", async ({
    page,
  }) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();
    // GO TO SECOND PAGE:
    // await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
    const targetRowById = page
      .getByRole("row", { name: "9" })
      .filter({ has: page.locator("td").nth(1).getByText("9") });
    await targetRowById.locator(".nb-edit").click({ force: true });

    await page.locator("input-editor").getByPlaceholder("E-mail").clear();
    await page
      .locator("input-editor")
      .getByPlaceholder("E-mail")
      .fill("changed@email.com");
    await page.locator(".nb-checkmark").click({ force: true });
    await expect(targetRowById).toContainText("changed@email.com");
    // or it can be used this: just check how PR works now
    await expect(targetRowById.locator("td").nth(5)).toHaveText(
      "changed@email.com"
    );
  });

  test("tables - verify filtering filter by age column returns correct results ", async ({
    page,
  }) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    // insert filter criteria to 'Age' filter:

    const ages = ["20", "40", "44", "55", "2000"];

    const rows = page.locator("tbody tr td:last-child");

    for (const age of ages) {
      await page.locator("input-filter").getByPlaceholder("Age").fill(age);
      await page.waitForTimeout(500);
      for (const row of await rows.all()) {
        if (age === "2000") {
          await expect(page.getByRole("table")).toContainText("No data found");
        } else {
          expect(row).toHaveText(age);
        }
      }
      await page.locator("input-filter").getByPlaceholder("Age").clear();
    }
  });

  test("datepicker - verify inserted date test", async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Datepicker").click();

    const calendarInputField = page.getByPlaceholder("Form Picker");
    await calendarInputField.click({ force: true });

    let date = new Date();
    date.setDate(date.getDate() + 1); // one day from now
    const expectedDate = date.getDate().toString();
    await page
      .locator("nb-calendar-day-cell")
      .getByText(expectedDate, { exact: true })
      .first()
      .click();

    const expectedDateValue =
      date.toLocaleString("en-US", { month: "short" }) +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear();
    await expect(calendarInputField).toHaveValue(expectedDateValue);
  });

  test("datepicker - browse through calendar months/years test", async ({
    page,
  }) => {
    await page.getByText("Forms").click();
    await page.getByText("Datepicker").click();

    const calendarInputField = page.getByPlaceholder("Form Picker");
    await calendarInputField.click({ force: true });

    let date = new Date();
    date.setDate(date.getDate() + 400); // 200 days from now
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString("en-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expectedYear = date.getFullYear();
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `;
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
    let calendarMonthAndYear = await page
      .locator("nb-calendar-view-mode")
      .textContent();
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await page
        .locator('nb-calendar-pageable-navigation g[data-name="chevron-right"]')
        .click();
      calendarMonthAndYear = await page
        .locator("nb-calendar-view-mode")
        .textContent();
    }
    await page
      .locator("nb-calendar-day-cell")
      .getByText(expectedDate, { exact: true })
      .click();
    await expect(calendarInputField).toHaveValue(dateToAssert);
  });

  test("manipulating with sliders - shortcut one test", async ({ page }) => {
    test.describe.configure({ retries: 2 }); // manually setup retries to 2
    await page.getByText("IoT Dashboard").click();
    await page.getByText("Humidity").click();
    await page.getByText("Temperature").click();

    // update attribute:
    const tempGauge = page.locator("[tabtitle='Temperature'] circle");
    await tempGauge.evaluate((node) => {
      node.setAttribute("cx", "232.630");
      node.setAttribute("cy", "232.630");
    });
    // this is a shortcut to do so:
    await tempGauge.click();
  });

  test("manipulating with sliders - mouse movement to the right test", async ({
    page,
  }) => {
    await page.getByText("IoT Dashboard").click();

    // update attribute:
    const tempBox = page.locator(
      "[tabtitle='Temperature'] ngx-temperature-dragger"
    );

    await tempBox.scrollIntoViewIfNeeded();
    // it will scroll down so whole element is visible on the screen

    // it is important to scroll before into view
    const box = await tempBox.boundingBox();

    // define center of box to be a staring point
    // otherwise it is top left corner
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;

    // moving mouse to location where I want to start:
    await page.mouse.move(x, y);
    await page.mouse.down(); // click the mouse button to begin movement
    // move to right:
    await page.mouse.move(x + 100, y);
    // move it down:
    await page.mouse.move(x + 100, y + 100);
    // end mouse movement:
    await page.mouse.up();
    // this will move slider to max value (to the right end of the curvy line)

    await expect(tempBox).toContainText("30");
  });

  test("manipulating with sliders - mouse movement to the left test", async ({
    page,
  }) => {
    await page.getByText("IoT Dashboard").click();

    // update attribute:
    const tempBox = page.locator(
      "[tabtitle='Temperature'] ngx-temperature-dragger"
    );

    await tempBox.scrollIntoViewIfNeeded();
    // it will scroll down so whole element is visible on the screen

    // it is important to scroll before into view
    const box = await tempBox.boundingBox();

    // define center of box to be a staring point
    // otherwise it is top left corner
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;

    // this will move slider to the opposite side (left end of curvy line)
    await page.mouse.move(x, y);
    await page.mouse.down(); // click the mouse button to begin movement
    // move to right:
    await page.mouse.move(x - 100, y);
    // move it down:
    await page.mouse.move(x - 100, y + 100);
    // end mouse movement:
    await page.mouse.up();

    await expect(tempBox).toContainText("13 Celsius");
  });
});
