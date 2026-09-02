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
