import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
import { CsvReader } from '../utilities/csvReader';
import { AdminLoginData } from '../types/AdminLoginData.types';
const adminloginData=CsvReader.read<AdminLoginData>("AdminLoginData.csv");
When('the user clicks on the Admin Login', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.sp.clickAdminButton();
});

When('the user enters the username and password', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  const data=adminloginData[0]!;
  await this.sp.setUsername(data.adminUsername);
  await this.sp.setPassword(data.adminPassword);
});

When('the user clicks the Login button', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.sp.clickSignButton();
});

Then('the user should see the Admin Portal', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.ap.adminPortal).toHaveText("Admin Portal");
});
When('the user enters the {string} and {string}', async function (this:CustomWorld,string, string2) {
  // Write code here that turns the phrase above into concrete actions
  await this.sp.setUsername(string);
  await this.sp.setPassword(string2);
});

Then('the user should see the {string}', async function (this: CustomWorld, expectedMessage: string) {

    if (expectedMessage === 'Please fill out this field.') {

        let message = '';

        // Check username field validation message
        message = await this.sp.adminUsername.evaluate(
            element => (element as HTMLInputElement).validationMessage
        );

        // If username has no validation message, check password field
        if (!message) {
            message = await this.sp.adminPassowrd.evaluate(
                element => (element as HTMLInputElement).validationMessage
            );
          }
          if (!message) {
                message = await this.rp.PasswordInput.evaluate(
                    element =>
                        (element as HTMLInputElement).validationMessage
                );
            }

        expect(message).toBe(expectedMessage);

    } else {

        // Application error message
        await expect(this.sp.invalidEmailOrPassword).toContainText(expectedMessage);
    }
});