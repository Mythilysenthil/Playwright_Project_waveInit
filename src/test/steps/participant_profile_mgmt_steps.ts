import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world/CustomWorld';

const temporaryUser = {
  email: 'kp@gmail.com',
  password: 'kp12345'
};

/** Reusable temporary-user sign-in for the profile-management scenarios. */
async function signInForProfileManagement(world: CustomWorld): Promise<void> {
  await world.ppm.signIn(temporaryUser.email, temporaryUser.password);
}

Given('the user is on the profile management page', async function (this: CustomWorld) {
  await signInForProfileManagement(this);
  await this.ppm.openProfileManagement();
  await expect(this.ppm.addSkill_btn).toBeVisible();
});

When('the user clicks the add skill button', async function (this: CustomWorld) {
  this.skillCountBeforeAction = await this.ppm.getSkillCount();
  await this.ppm.clickAddSkill();
});

When('enter the skill name', async function (this: CustomWorld) {
  await this.ppm.enterSkillName(`Playwright skill ${Date.now()}`);
});

When('enter the skill name by typing in the skill input field', async function (this: CustomWorld) {
  await this.ppm.enterSkillName(`Playwright skill ${Date.now()}`);
});

When('clicks the Add skill button', async function (this: CustomWorld) {
  await this.ppm.confirmAddSkill();
});

Then('the skill should be added to the profile successfully', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getSkillCount()).toBeGreaterThan(this.skillCountBeforeAction);
});

When('the user deletes the skill by clicking the delete button next to the skill', async function (this: CustomWorld) {
  this.skillCountBeforeAction = await this.ppm.getSkillCount();
  expect(this.skillCountBeforeAction).toBeGreaterThan(0);
  await this.ppm.deleteFirstSkill();
});

When('the user confirms the deletion', async function (this: CustomWorld) {
  await this.ppm.confirmSkillDeletion();
});

Then('the skill should be removed from the profile successfully', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getSkillCount()).toBeLessThan(this.skillCountBeforeAction);
});

When('clicks the cancel button', async function (this: CustomWorld) {
  await this.ppm.cancelSkillDialog();
});

Then('the skill should not be added to the profile', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getSkillCount()).toBe(this.skillCountBeforeAction);
});

Then('the skill should not be removed from the profile', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getSkillCount()).toBe(this.skillCountBeforeAction);
});
