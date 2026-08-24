import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
import { CsvReader } from '../utilities/csvReader';
import { RegisterData } from '../types/RegisterData.types';
const registerData = CsvReader.read<RegisterData>("RegisterData.csv");
Given('click the signup button', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.sp.clickSignUpButton();
});

When('I enter valid registration details', async function (this: CustomWorld) {

    const data = registerData[0]!;

    await this.rp.setName(data.Name);
    await this.rp.setEmail(data.Email);
    await this.rp.setMobile(data.Phone);
    await this.rp.setPassword(data.password);
    await this.rp.setConfirmPassword(data.Retype_Password);
    await this.rp.checkAcceptTerms();
});

When('I submit the registration form', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.rp.clickCreateAccount();
});

Then('I should see a confirmation message indicating successful registration', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
    await expect(this.rp.RegistrationSuccessMessage).toBeVisible();
    await expect(this.rp.RegistrationSuccessMessage).toHaveText(/Registration submitted successfully! Your account/);
});