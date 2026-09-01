import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { CustomWorld } from '../world/CustomWorld';
import { TIMEOUTS } from '../constants/timeouts';


When(`the trainer navigates to the Coding tab`, async function (this: CustomWorld) {
    await this.tca.clickCoding();
});

Then(`the trainer should see the assessment created success message`, async function (this: CustomWorld) {

    console.log("STEP: Checking assessment success message");
    console.log("Current URL:", this.page.url());
    await expect(this.tca.assCreationMsg).toBeVisible({
        timeout: TIMEOUTS.PAGE_LOAD
    });

    const actualText = await this.tca.getSuccessMsg();
    console.log(
        "STEP: Actual success message text =",
        actualText
    );

    expect(actualText.toLowerCase()).toContain(
        "assessment created"
    );
});


Then(`the newly created coding assessment should be displayed with DRAFT status`, async function (this: CustomWorld) {
    const isVisible = await this.tca.isVisibleDraft();
    expect(isVisible).toBe(true);
});

When(`the trainer clicks on the edit button of the draft coding assessment`, async function (this: CustomWorld) {
    await this.tca.clickEditBtn();
});

Then(`the coding assessment edit page should be displayed`, async function (this: CustomWorld) {
    console.log("EDIT PAGE CURRENT URL:", this.page.url());
    const EditPage = await this.tca.isVisibleEditPage();
    console.log("EDIT PAGE VISIBLE:", EditPage);
    expect(EditPage).toBe(true);
});