import { Locator, Page } from "@playwright/test";

export class FormLayoutsPage {
  readonly page: Page;
  readonly emailUSGInput: Locator;
  readonly passwordUSGInput: Locator;
  readonly option1Radio: Locator;
  readonly option2Radio: Locator;
  readonly disabledOptionRadio: Locator;
  readonly signInUSGBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailUSGInput = page
      .locator("ngx-form-layouts")
      .locator("#inputEmail1");
    this.passwordUSGInput = page
      .locator("ngx-form-layouts")
      .locator("#inputPassword2");
    this.option1Radio = page.getByRole("radio", { name: "Option 1" });
    this.option2Radio = page.getByRole("radio", { name: "Option 2" });
    this.disabledOptionRadio = page.getByRole("radio", {
      name: "Disabled Option",
    });
    this.signInUSGBtn = page.locator("ngx-form-layouts").getByTestId("SignIn");
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string,
    option: string
  ) {
    await this.emailUSGInput.fill(email);
    await this.passwordUSGInput.fill(password);
    await this.page.getByRole("radio", { name: option }).check({ force: true });
    await this.signInUSGBtn.click();
  }

  async submitUsingTheGridFormWithCredentialsAndCheckbox(
    email: string,
    password: string,
    rememberMe: boolean
  ) {
    await this.emailUSGInput.fill(email);
    await this.passwordUSGInput.fill(password);
    await this.page.getByRole("radio", { name: option }).check({ force: true });
    await this.signInUSGBtn.click();
  }
}
