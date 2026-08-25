import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';


When('the user clicks the AI Assistant Button', async function (this: CustomWorld) {

    await this.ai.clickAIAssistantButton();

});


When('the user liks the What should I do next Button', async function (this: CustomWorld) {

    await this.ai.clickWhatShouldIDoNextButton();

});


When('clik the complete my profile button', async function (this: CustomWorld) {

    await this.ai.clickCompleteMyProfileButton();

});


Then('the User should be direted to the profile page', async function (this: CustomWorld) {

    await expect(this.page).toHaveURL(/my-profile/);

});


Then('the User should see Already on profile page message', async function (this: CustomWorld) {

    await expect(
        this.ai.alreadyOnProfileMessage
    ).toBeVisible();

});