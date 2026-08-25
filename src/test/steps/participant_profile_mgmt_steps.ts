import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world/CustomWorld';
import { LearnerEducation } from '../types/LearnerEducation.types';
import { CsvReader } from '../utilities/csvReader';

const temporaryUser = {
  email: 'kp@gmail.com',
  password: 'kp12345'
};

const educationData = CsvReader.read<LearnerEducation>('EducationLearner.csv');

/** Reusable temporary-user sign-in for the profile-management scenarios. */
async function signInForProfileManagement(world: CustomWorld): Promise<void> {
  await world.ppm.signIn(temporaryUser.email, temporaryUser.password);
}

Given('the user is on the profile management page', async function (this: CustomWorld) {
  await signInForProfileManagement(this);
  await this.ppm.openProfileManagement();
  await expect(this.ppm.addSkill_btn).toBeVisible({ timeout: 30_000 });
});

When('the user clicks the add skill button', async function (this: CustomWorld) {
  this.skillCountBeforeAction = await this.ppm.getSkillCount();
  this.activeProfileDialog = 'skill';
  await this.ppm.clickAddSkill();
});

When('enter the skill name', async function (this: CustomWorld) {
  await this.ppm.enterSkillName(`Playwright skill ${Date.now()}`);
});

When('enter the skill name by typing in the skill input field', async function (this: CustomWorld) {
  await this.ppm.enterSkillNameAndPressEnter(`Playwright skill ${Date.now()}`);
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
  this.activeProfileDialog = 'skill';
  await this.ppm.deleteFirstSkill();
});

When('the user confirms the deletion', async function (this: CustomWorld) {
  if (this.activeProfileDialog === 'education') {
    await this.ppm.confirmEducationDeletion();
  } else {
    await this.ppm.confirmSkillDeletion();
  }
});

Then('the skill should be removed from the profile successfully', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getSkillCount()).toBeLessThan(this.skillCountBeforeAction);
});

When('clicks the cancel button', async function (this: CustomWorld) {
  // Both dialogs expose the same cancel action; choose the semantic page-object locator.
  if (this.activeProfileDialog === 'education') {
    await this.ppm.cancelEducationBtn.click();
  } else {
    await this.ppm.cancelSkillDialog();
  }
});

Then('the skill should not be added to the profile', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getSkillCount()).toBe(this.skillCountBeforeAction);
});

Then('the skill should not be removed from the profile', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getSkillCount()).toBe(this.skillCountBeforeAction);
});

When('the user clicks the add Education button', async function (this: CustomWorld) {
  this.educationCountBeforeAction = await this.ppm.getEducationCount();
  this.activeProfileDialog = 'education';
  await this.ppm.clickAddEducation();
});

When('enter the Education details', async function (this: CustomWorld) {
  await this.ppm.enterEducationDetails(educationData[0]!);
});

When('clicks the Add Education button', async function (this: CustomWorld) {
  await this.ppm.confirmAddEducation();
});

Then('the Education details should be added to the profile successfully', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getEducationCount()).toBeGreaterThan(this.educationCountBeforeAction);
});

Then('the Education details should not be added to the profile', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getEducationCount()).toBe(this.educationCountBeforeAction);
});

When('clicks the Add Education button without entering any details', async function (this: CustomWorld) {
  await this.ppm.confirmAddEducation();
});

Then('the user should see a validation message', async function (this: CustomWorld) {
  await expect(this.ppm.requiredIntitution).toBeVisible();
  await expect(this.ppm.requiredDegree).toBeVisible();
});

When('the user deletes the Education details by clicking the delete button next to the Education details', async function (this: CustomWorld) {
  this.educationCountBeforeAction = await this.ppm.getEducationCount();

  // Deletion scenarios must be self-contained when no education record exists yet.
  if (this.educationCountBeforeAction === 0) {
    await this.ppm.clickAddEducation();
    await this.ppm.enterEducationDetails(educationData[0]!);
    await this.ppm.confirmAddEducation();
    await expect.poll(() => this.ppm.getEducationCount()).toBeGreaterThan(0);
    this.educationCountBeforeAction = await this.ppm.getEducationCount();
  }

  this.activeProfileDialog = 'education';
  await this.ppm.deleteFirstEducation();
});

Then('the Education details should be removed from the profile successfully', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getEducationCount()).toBeLessThan(this.educationCountBeforeAction);
});

Then('the Education details should not be removed from the profile', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getEducationCount()).toBe(this.educationCountBeforeAction);
});
