import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
  readonly datepickerMenuItem: Locator;
  readonly formLayoutsMenuItem: Locator;
  readonly smartTableMenuItem: Locator;
  readonly toastrMenuItem: Locator;
  readonly tooltipMenuItem: Locator;

  constructor(page: Page) {
    super(page);
    this.datepickerMenuItem = page.getByText("Datepicker");
    this.formLayoutsMenuItem = page.getByText("Form Layouts");
    this.smartTableMenuItem = page.getByText("Smart Table");
    this.toastrMenuItem = page.getByText("Toastr");
    this.tooltipMenuItem = page.getByText("Tooltip");
  }

  async datepickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.datepickerMenuItem.first().click();
  }

  async formLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.formLayoutsMenuItem.first().click();
    await this.waitForNumberOfSeconds(2); // used just for example purposes
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.smartTableMenuItem.first().click();
  }

  async toastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.toastrMenuItem.click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.tooltipMenuItem.click();
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    // if menu is expanded it wont click again on the menu group item,
    // otherwise it would collapse it and I dont want it
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState === "false") {
      await groupMenuItem.click();
    }
  }
}
