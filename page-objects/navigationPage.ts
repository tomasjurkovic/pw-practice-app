import { Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async datepickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.page.getByText("Datepicker").first().click();
  }

  async formLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.page.getByText("Form Layouts").first().click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.page.getByText("Smart Table").first().click();
  }

  async toastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Toastr").click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Tooltip").click();
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
