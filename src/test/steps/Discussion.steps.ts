import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
When('click My courses', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.dp.clickMycourse();
});

When('click any course', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.mp.clickPlaywrightAutomationCourse();
});

When('Click my discussion', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.cp.clickDiscussion();
});

When('select the {string} of post', async function (this:CustomWorld,string) {
  await this.cp.selectDiscussionType(string)
});

When('enter the discussion question', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.cp.setDiscussion("Hi")
});

When('click Post', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.cp.clickCreatePost();
});

Then('user can see post is created', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.cp.postCreated).toBeVisible();
});

