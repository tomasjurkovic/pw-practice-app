import { Page, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datepickerPage";

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly datepickerPage: DatepickerPage;
  private readonly formLayoutsPage: FormLayoutsPage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.datepickerPage = new DatepickerPage(this.page);
    this.formLayoutsPage = new FormLayoutsPage(this.page);
  }

  onNavigationPage() {
    return this.navigationPage;
  }

  onFormLayoutsPage() {
    return this.formLayoutsPage;
  }

  onDatepickerPage() {
    return this.datepickerPage;
  }
}
