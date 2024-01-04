import { test } from "../test-options";
import { faker } from "@faker-js/faker";

test.describe("test suite 1", () => {
  test("Login with valid credentials via Using The Grid Form test", async ({
    pageManager,
  }) => {
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
      1000
    )}@test.sk`;

    await pageManager
      .onFormLayoutsPage()
      .submitUsingTheGridFormWithCredentialsAndSelectOption(
        randomFullName,
        "password",
        "Option 1"
      );
    await pageManager
      .onFormLayoutsPage()
      .submitUsingTheGridFormWithCredentialsAndCheckbox(
        randomEmail,
        "password",
        true
      );
  });
});
