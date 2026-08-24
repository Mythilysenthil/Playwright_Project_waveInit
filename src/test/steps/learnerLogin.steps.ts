import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
import { CsvReader } from '../utilities/csvReader';
import { LearnerLoginData } from '../types/LearnerLoginData.types';

const learnerLoginData = CsvReader.read<LearnerLoginData>(
    "LearnerLoginData.csv"
);

Given('clicks the Learner Button', async function (this: CustomWorld) {

    await this.sp.clickLearnerButton();

});

When('the user enters valid credentials', async function (this: CustomWorld) {

    const data = learnerLoginData[0]!;

    await this.sp.enterLearnerCredentials(
        data.Username,
        data.Password
    );

});

When('the user enters invalid credentials', async function (this: CustomWorld) {

    const data = learnerLoginData[1]!;

    await this.sp.enterLearnerCredentials(
        data.Username,
        data.Password
    );

});

When('the user clicks the Sign in as Learner Button', async function (this: CustomWorld) {

    await this.sp.clickSignInAsLearnerButton();

});

Then('the user should be directed to the home page', async function (this: CustomWorld) {

    await expect(this.page).toHaveURL(/home/i);

});

Then('the user sees a pop up error message', async function (this: CustomWorld) {

    await expect(this.sp.popupErrorMessage).toBeVisible();

});

Then('the user should see an error message', async function (this: CustomWorld) {

    await expect(this.sp.errorMessage).toBeVisible();

});