import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
When('the user navigates to the Interview module', async function(this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.ap.clickInterviewModoule();
});

When('the user clicks the View button', async function(this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.aip.clickViewDetails()
});

Then('the interview details should be displayed', async function(this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.aip.interviewDetailsHeading.waitFor({ state: 'visible' }); await expect( this.aip.interviewDetailsHeading ).toBeVisible(); 
});
When('the user clicks the Edit button in interview', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.aip.clickEditInterview()
});

When('the user clicks the Save button', async function(this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.aip.clickSaveChanges()
});

Then('the interview details should be updated successfully', async function(this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.aip.interviewUpdated).toContainText("Interview updated successfully")
});

When('the user clicks the Cancel button', async function(this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.aip.clickCancel();
});

Then('the changes should not be saved', async function(this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.aip.editInterviewButton).toBeTruthy();
});

Then('the user can see interview title', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.aip.interviewPageTitle).toContainText("Interviews")
});
When('the user clicks the All filter', async function (this: CustomWorld) {
    await this.aip.clickAllFilter();
});

Then('the interview list should be displayed', async function (this: CustomWorld) {
    await expect(
        this.aip.changeStatusButton.first()
    ).toBeVisible();
});

When('the user clicks the Scheduled filter', async function (this: CustomWorld) {
    await this.aip.clickScheduledFilter();
});

When('the user clicks the Change Status button of the first interview', async function (this: CustomWorld) {
    await this.aip.clickChangeStatus();
});

Then('the interview status should be Scheduled', async function (this: CustomWorld) {
    await this.aip.verifyScheduledStatus();
});

When('the user clicks the In Progress filter', async function (this: CustomWorld) {
    await this.aip.clickInProgressFilter();
});

Then('the interview status should be In Progress', async function (this: CustomWorld) {
    await this.aip.verifyInProgressStatus();
});

When('the user clicks the Completed filter', async function (this: CustomWorld) {
    await this.aip.clickCompletedFilter();
});

Then('the interview status should be Completed', async function (this: CustomWorld) {
    await this.aip.verifyCompletedStatus();
});

When('the user clicks the Cancelled filter', async function (this: CustomWorld) {
    await this.aip.clickCancelledFilter();
});

Then('the interview status should be Cancelled', async function (this: CustomWorld) {
    await this.aip.verifyCancelledStatus();
});