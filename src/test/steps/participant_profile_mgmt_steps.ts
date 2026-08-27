import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world/CustomWorld';
import { LearnerEducation } from '../types/LearnerEducation.types';
import { CsvReader } from '../utilities/csvReader';
import { ExcelReader } from '../utilities/ExcelReader';
import { SocialLinks } from '../types/SocialLinks.types';
import { PersonalInformation } from '../types/PersonalInformation.types';
import personalInformationFixture from '../test-data/Participant_PersonalDetails.json';

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
let personalInformationBeforeEdit: PersonalInformation | undefined;
let updatedPersonalInformation: PersonalInformation | undefined;
let skillCountBeforeAction = 0;
let educationCountBeforeAction = 0;
let activeProfileDialog: 'skill' | 'education' | undefined;
let originalEducation: LearnerEducation | undefined;
let updatedEducation: LearnerEducation | undefined;
const personalInformationData: PersonalInformation = personalInformationFixture.data;
const cancelledPersonalInformation: PersonalInformation = {
  fullname: 'Cancelled Test User',
  phone: '9876543210',
  department: 'Quality Assurance',
  designation: 'Test Engineer'
};

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
  skillCountBeforeAction = await this.ppm.getSkillCount();
  activeProfileDialog = 'skill';
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
  await expect.poll(() => this.ppm.getSkillCount()).toBeGreaterThan(skillCountBeforeAction);
});

When('the user deletes the skill by clicking the delete button next to the skill', async function (this: CustomWorld) {
  skillCountBeforeAction = await this.ppm.getSkillCount();
  expect(skillCountBeforeAction).toBeGreaterThan(0);
  activeProfileDialog = 'skill';
  await this.ppm.deleteFirstSkill();
});

When('the user confirms the deletion', async function (this: CustomWorld) {
  if (activeProfileDialog === 'education') {
    await this.ppm.confirmEducationDeletion();
  } else {
    await this.ppm.confirmSkillDeletion();
  }
});

Then('the skill should be removed from the profile successfully', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getSkillCount()).toBeLessThan(skillCountBeforeAction);
});

When('clicks the cancel button', async function (this: CustomWorld) {
  // Both dialogs expose the same cancel action; choose the semantic page-object locator.
  if (activeProfileDialog === 'education') {
    await this.ppm.cancelEducationBtn.click();
  } else {
    await this.ppm.cancelSkillDialog();
  }
});

Then('the skill should not be added to the profile', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getSkillCount()).toBe(skillCountBeforeAction);
});

Then('the skill should not be removed from the profile', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getSkillCount()).toBe(skillCountBeforeAction);
});

When('the user clicks the add Education button', async function (this: CustomWorld) {
  educationCountBeforeAction = await this.ppm.getEducationCount();
  activeProfileDialog = 'education';
  await this.ppm.clickAddEducation();
});

When('enter the Education details', async function (this: CustomWorld) {
  await this.ppm.enterEducationDetails(educationData[0]!);
});

When('clicks the Add Education button', async function (this: CustomWorld) {
  await this.ppm.confirmAddEducation();
});

Then('the Education details should be added to the profile successfully', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getEducationCount()).toBeGreaterThan(educationCountBeforeAction);
});

Then('the Education details should not be added to the profile', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getEducationCount()).toBe(educationCountBeforeAction);
});

When('clicks the Add Education button without entering any details', async function (this: CustomWorld) {
  await this.ppm.confirmAddEducation();
});

Then('the user should see a validation message', async function (this: CustomWorld) {
  await expect(this.ppm.requiredIntitution).toBeVisible();
  await expect(this.ppm.requiredDegree).toBeVisible();
});

When('the user deletes the Education details by clicking the delete button next to the Education details', async function (this: CustomWorld) {
  educationCountBeforeAction = await this.ppm.getEducationCount();

  // Deletion scenarios must be self-contained when no education record exists yet.
  if (educationCountBeforeAction === 0) {
    await this.ppm.clickAddEducation();
    await this.ppm.enterEducationDetails(educationData[0]!);
    await this.ppm.confirmAddEducation();
    await expect.poll(() => this.ppm.getEducationCount()).toBeGreaterThan(0);
    educationCountBeforeAction = await this.ppm.getEducationCount();
  }

  activeProfileDialog = 'education';
  await this.ppm.deleteFirstEducation();
});

Then('the Education details should be removed from the profile successfully', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getEducationCount()).toBeLessThan(educationCountBeforeAction);
});

Then('the Education details should not be removed from the profile', async function (this: CustomWorld) {
  await expect.poll(() => this.ppm.getEducationCount()).toBe(educationCountBeforeAction);
});

When('the user clicks the edit button', async function (this: CustomWorld) {
  // Keep this scenario independent from scenario execution order and existing profile data.
  if (await this.ppm.getEducationCount() === 0) {
    await this.ppm.clickAddEducation();
    await this.ppm.enterEducationDetails(educationData[0]!);
    await this.ppm.confirmAddEducation();
    await expect.poll(() => this.ppm.getEducationCount()).toBeGreaterThan(0);
  }

  activeProfileDialog = 'education';
  await this.ppm.editFirstEducation();
  originalEducation = await this.ppm.getEducationDetailsFromForm();
});

When('update the Education details with the following data', async function (this: CustomWorld, dataTable: DataTable) {
  const education = dataTable.hashes()[0];
  expect(education, 'The education data table must include one row of data.').toBeDefined();
  updatedEducation = {
    institution: education?.institution ?? '',
    degree: education?.degree ?? '',
    Field_of_study: education?.Field_of_study ?? '',
    Year_range: education?.Year_range ?? '',
    CGPA: education?.CGPA ?? ''
  };
  await this.ppm.enterEducationDetails(updatedEducation);
});

When('clicks the Save button', async function (this: CustomWorld) {
  await this.ppm.saveEducationDetails();
});

Then('the Education details should be updated in the profile successfully', async function (this: CustomWorld) {
  expect(updatedEducation, 'Education details must be entered before saving.').toBeDefined();
  await expect.poll(() => this.ppm.areEducationDetailsVisible(updatedEducation!)).toBe(true);
});

Then('the Education details should not be updated in the profile', async function (this: CustomWorld) {
  // Re-open the record after cancelling to verify the persisted values, not just that the dialog closed.
  expect(originalEducation, 'Education details must be captured before cancelling.').toBeDefined();
  await this.ppm.editFirstEducation();
  await expect.poll(() => this.ppm.getEducationDetailsFromForm()).toEqual(originalEducation);
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

  // Saving causes the profile section to re-render asynchronously; assert the
  // persisted values rather than the previous values still shown during refresh.
  await expect.poll(() => this.ppm.getDisplayedSocialLinks()).toEqual(expectedSocialLinks);
});

Then('the Social Links should not be updated', async function (this: CustomWorld) {
  expect(socialLinksBeforeEdit, 'Social Links must be captured before cancelling the edit.').toBeDefined();
  await expect.poll(() => this.ppm.getDisplayedSocialLinks()).toEqual(socialLinksBeforeEdit);
});

When('the user clicks the Edit button', async function (this: CustomWorld) {
  await this.ppm.clickPersonalInformationEdit();
  personalInformationBeforeEdit = await this.ppm.getPersonalInformationFromForm();
});

When('the user enters the personal information details', async function (this: CustomWorld) {
  updatedPersonalInformation = personalInformationData;
  await this.ppm.enterPersonalInformation(personalInformationData);
});

When('the user enters different personal information details', async function (this: CustomWorld) {
  updatedPersonalInformation = cancelledPersonalInformation;
  await this.ppm.enterPersonalInformation(cancelledPersonalInformation);
});

When('the user clicks the Save personal information button', async function (this: CustomWorld) {
  await this.ppm.savePersonalInformation();
});

When('the user clicks the Cancel personal information button', async function (this: CustomWorld) {
  await this.ppm.cancelPersonalInformation();
});

Then('the personal information should be updated successfully', async function (this: CustomWorld) {
  expect(updatedPersonalInformation, 'Personal information must be entered before saving.').toBeDefined();
  await this.ppm.clickPersonalInformationEdit();
  await expect.poll(() => this.ppm.getPersonalInformationFromForm()).toEqual(updatedPersonalInformation);
  await this.ppm.cancelPersonalInformation();
});

Then('the personal information should not be updated', async function (this: CustomWorld) {
  expect(personalInformationBeforeEdit, 'Personal information must be captured before cancelling.').toBeDefined();
  await this.ppm.clickPersonalInformationEdit();
  await expect.poll(() => this.ppm.getPersonalInformationFromForm()).toEqual(personalInformationBeforeEdit);
  await this.ppm.cancelPersonalInformation();
});

When("the user Leaves the name field empty", async function () {
  await this.profileManagementPage.leaveNameFieldEmpty();
});

Then("the user should see a validation message", async function () {
  await this.profileManagementPage.verifyNameRequiredMessage();
});
