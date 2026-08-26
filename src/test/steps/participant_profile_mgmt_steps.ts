import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world/CustomWorld';
import { LearnerEducation } from '../types/LearnerEducation.types';
import { CsvReader } from '../utilities/csvReader';
import { ExcelReader } from '../utilities/ExcelReader';
import { SocialLinks } from '../types/SocialLinks.types';

const temporaryUser = {
  email: 'kp@gmail.com',
  password: 'kp12345'
};

const educationData = CsvReader.read<LearnerEducation>('EducationLearner.csv');
const socialLinksData = ExcelReader.read<SocialLinks>('SocialLinks.xlsx', 'SocialLinks');
const cancelledSocialLinks: SocialLinks = {
  linkedin: 'https://www.linkedin.com/in/cancelled-playwright-profile',
  github: 'https://github.com/cancelled-playwright-profile'
};
let socialLinksBeforeEdit: SocialLinks | undefined;

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

When('the user clicks the edit button', async function (this: CustomWorld) {
  // Keep this scenario independent from scenario execution order and existing profile data.
  if (await this.ppm.getEducationCount() === 0) {
    await this.ppm.clickAddEducation();
    await this.ppm.enterEducationDetails(educationData[0]!);
    await this.ppm.confirmAddEducation();
    await expect.poll(() => this.ppm.getEducationCount()).toBeGreaterThan(0);
  }

  this.activeProfileDialog = 'education';
  await this.ppm.editFirstEducation();
  this.originalEducation = await this.ppm.getEducationDetailsFromForm();
});

When('update the Education details with the following data', async function (this: CustomWorld, dataTable: DataTable) {
  const education = dataTable.hashes()[0];
  expect(education, 'The education data table must include one row of data.').toBeDefined();
  this.updatedEducation = {
    institution: education?.institution ?? '',
    degree: education?.degree ?? '',
    Field_of_study: education?.Field_of_study ?? '',
    Year_range: education?.Year_range ?? '',
    CGPA: education?.CGPA ?? ''
  };
  await this.ppm.enterEducationDetails(this.updatedEducation);
});

When('clicks the Save button', async function (this: CustomWorld) {
  await this.ppm.saveEducationDetails();
});

Then('the Education details should be updated in the profile successfully', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.areEducationDetailsVisible(this.updatedEducation)).toBe(true);
});

Then('the Education details should not be updated in the profile', async function (this: CustomWorld) {
  // Re-open the record after cancelling to verify the persisted values, not just that the dialog closed.
  await this.ppm.editFirstEducation();
  await expect.poll(() => this.ppm.getEducationDetailsFromForm()).toEqual(this.originalEducation);
  await this.ppm.cancelEducationEdit();
});

When('the user clicks the Social Links edit button', async function (this: CustomWorld) {
  socialLinksBeforeEdit = await this.ppm.getDisplayedSocialLinks();
  await this.ppm.clickSocialLinksEdit();
});

When('the user enters the Social Links details', async function (this: CustomWorld) {
  await this.ppm.enterSocialLinks(socialLinksData[0]!);
});

When('the user enters different Social Links details', async function (this: CustomWorld) {
  await this.ppm.enterSocialLinks(cancelledSocialLinks);
});

When('the user clicks the Save Social Links button', async function (this: CustomWorld) {
  await this.ppm.saveSocialLinks();
});

When('the user clicks the Cancel Social Links button', async function (this: CustomWorld) {
  await this.ppm.cancelSocialLinks();
});

Then('the Social Links should be added successfully', async function (this: CustomWorld) {
  const expectedSocialLinks = socialLinksData[0]!;
  const displayedSocialLinks = await this.ppm.getDisplayedSocialLinks();

  expect(displayedSocialLinks.linkedin).toBe(expectedSocialLinks.linkedin);
  expect(displayedSocialLinks.github).toBe(expectedSocialLinks.github);
});

Then('the Social Links should not be updated', async function (this: CustomWorld) {
  expect(socialLinksBeforeEdit, 'Social Links must be captured before cancelling the edit.').toBeDefined();
  await expect.poll(() => this.ppm.getDisplayedSocialLinks()).toEqual(socialLinksBeforeEdit);
});
