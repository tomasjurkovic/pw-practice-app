import { test } from "../test-options";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";

test.describe("test suite 1", () => {
  test("Login with valid credentials via Using The Grid Form test", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
      1000
    )}@test.sk`;

    await pm
      .onFormLayoutsPage()
      .submitUsingTheGridFormWithCredentialsAndSelectOption(
        randomFullName,
        "password",
        "Option 1"
      );
    await pm
      .onFormLayoutsPage()
      .submitUsingTheGridFormWithCredentialsAndCheckbox(
        randomEmail,
        "password",
        true
      );
  });
});
