import { Locator, Page, expect } from "@playwright/test";

export class DatepickerPage {
  readonly page: Page;
  readonly commonDatepickerInput: Locator;
  readonly rangeDatepickerInput: Locator;
  readonly minMaxDatepickerInput: Locator;

  constructor(page: Page) {
    this.page = page;
    // Horizontal form section:
    this.commonDatepickerInput = page.getByPlaceholder("Form Picker");
    this.rangeDatepickerInput = page.getByPlaceholder("Range Picker");
    this.minMaxDatepickerInput = page.getByPlaceholder("Min Max Picker");
  }

  async selectCommonDatePickerDateFromToday(daysFromNow: number) {
    await this.commonDatepickerInput.click();
    const dateToAssert = await this.selectCommonDatePickerDateFromToday(
      daysFromNow
    );
    await expect(this.commonDatepickerInput).toHaveValue(`${dateToAssert}`);
  }

  private async selectDateInCalendar(daysFromNow: number) {
    let date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString("en-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expectedYear = date.getFullYear();
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `;
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page
        .locator('nb-calendar-pageable-navigation g[data-name="chevron-right"]')
        .click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }
    await this.page
      .locator("nb-calendar-day-cell")
      .getByText(expectedDate, { exact: true })
      .click();
    return dateToAssert;
  }
}