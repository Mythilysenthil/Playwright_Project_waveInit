import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from "@playwright/test";
import { validdata, invalidPassword, invalidUsername, emptyUsername, emptyPassword } from "../test-data/login_trainer.json";
import { CustomWorld } from "../world/CustomWorld";
import { TIMEOUTS } from '../constants/timeouts';
import { logger } from '../utilities/logger';

Given(`the trainer is on the login page`, async function (this: CustomWorld) {
    await this.ltp.Navigatepage();
});

When(`the trainer enters valid credentials`, async function (this: CustomWorld) {
    await this.ltp.clicktrainertab();

    await this.ltp.enteremail(validdata.email);
    await this.ltp.enterPassword(validdata.password);
});

When(`the trainer clicks on the login button`, async function (this: CustomWorld) {
    await this.ltp.clickSigninButton();
    console.log("Login clicked");
});

Then(`the trainer should be redirected to the dashboard page`, async function (this: CustomWorld) {
    await expect(this.page).toHaveURL("https://www.waveinitlms.online/trainer",{timeout: TIMEOUTS.PAGE_LOAD});
    logger.info("URL PASSED");
    await expect(this.ltp.dashboard).toHaveText("Welcome back, Trainer01!",{timeout: TIMEOUTS.PAGE_LOAD});
    logger.info('DASHBOARD TEXT PASSED');
});

When(`the trainer enters invalid password credentials`, async function (this: CustomWorld) {
    await this.ltp.clicktrainertab();
    logger.info('Entering invalid password credentials');
    await this.ltp.enteremail(invalidPassword.email);
    await this.ltp.enterPassword(invalidPassword.password);
});

When(`the trainer enters invalid username credentials`, async function (this: CustomWorld) {
    await this.ltp.clicktrainertab();
    logger.info('Entering invalid username credentials');
    await this.ltp.enteremail(invalidUsername.email);
    await this.ltp.enterPassword(invalidUsername.password);
});

Then(`the trainer should see the error message {string}`,async function (this: CustomWorld, expectedMessage: string) {
    logger.info(`Checking error message: ${expectedMessage}`);
    await expect(this.ltp.errormsg).toHaveText(expectedMessage, {timeout: TIMEOUTS.ASSERTION});
    logger.info('Invalid credentials error message displayed successfully');
});

When(`the trainer enters valid password without username`, async function (this: CustomWorld) {
    await this.ltp.clicktrainertab();
    await this.ltp.enteremail(emptyUsername.email);
    await this.ltp.enterPassword(emptyUsername.password);
});

When(`the trainer enters valid username without password`, async function (this: CustomWorld) {
    await this.ltp.clicktrainertab();
    await this.ltp.enteremail(emptyPassword.email);
    await this.ltp.enterPassword(emptyPassword.password);
});

Then(`the trainer should see the username validation message {string}`,async function (this: CustomWorld, expectedMessage: string) {
        const actualMessage = await this.ltp.getValidationMessage(this.ltp.email);
        expect(actualMessage).toBe(expectedMessage);
        logger.info(`Username validation message verified: ${actualMessage}`);
});

Then(`the trainer should see the password validation message {string}`,async function (this: CustomWorld, expectedMessage: string) {
        const actualMessage = await this.ltp.getValidationMessage(this.ltp.password);
        expect(actualMessage).toBe(expectedMessage);
        logger.info(`Password validation message verified: ${actualMessage}`);
});