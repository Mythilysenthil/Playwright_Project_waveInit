import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
import { TIMEOUTS } from '../constants/timeouts';
import { CsvReader } from '../utilities/csvReader';
import { ModuleData } from '../types/TrainerModuleData.types';

const moduleData = CsvReader.read<ModuleData>("TrainerModule.csv");

Then(`the trainer navigates to the {string} page`, async function (this: CustomWorld, pageName: string) {
    console.log(`STEP START: Navigate to ${pageName}`);
    if (pageName === "My Trainings") {
        await this.tmp.clickMyTrainer();
    }
    console.log(`STEP END: Navigate to ${pageName}`);
    console.log("CURRENT URL:", this.page.url());
});

Then(`the trainer should see the assigned course`, async function (this: CustomWorld){
    await expect(this.tmp.course).toBeVisible({
        timeout: TIMEOUTS.ASSERTION
    });
});

When(`the trainer selects the assigned course`, async function (this: CustomWorld){
    console.log("STEP START: Select assigned course");
    await this.tmp.clickCourse();
    console.log("STEP END: Assigned course selected");
    console.log("CURRENT URL:", this.page.url());
});

Then(`the trainer should be redirected to the Course Editor page`, async function (this: CustomWorld){
    console.log("STEP START: Verify Course Editor page");

    console.log("CURRENT URL:", this.page.url());
    await expect(this.page).toHaveURL(
        /trainer\?tab=courses&courseId=\d+/,
        {
            timeout: TIMEOUTS.PAGE_LOAD
        }
    );

    console.log("COURSE EDITOR URL PASSED");
    await this.tmp.verifyCourseEditorPage();
    console.log("COURSE EDITOR PAGE CONFIRMED");
});

When(`the trainer clicks on the {string} button`, async function (this: CustomWorld,buttonName: string){
    if (buttonName === "Add Module") {
        await this.tmp.clicklessons();
        await this.tmp.clickAddModule();
    }
    else if(buttonName === "Create Assessment"){
        await this.tca.clickCreateAssessment();
    }
});

When(`the trainer enters a valid module name`, async function (this: CustomWorld){
    const data = moduleData[0]!;

    await this.tmp.enterTitle(data.title);
    await this.tmp.enterDescription(data.description);
    await this.tmp.enterSummary(data.summary);
});

When(`the trainer saves the module`, async function (this: CustomWorld){
    await this.tmp.clickCreatebtn();
});

Then(`the trainer should see the newly added module`, async function (this: CustomWorld){
    const expectedModule = moduleData[0]!.title;
    const actualModule = await this.tmp.validModule(expectedModule);

    console.log("EXPECTED MODULE:", expectedModule);
    console.log("ACTUAL MODULE:", actualModule);
    await expect(actualModule?.trim()).toBe(expectedModule);
});

When(`the trainer leaves the module name empty`, async function (this: CustomWorld) {
    await this.tmp.enterTitle("");
});

Then(`the trainer should see the module name validation message`, async function (this: CustomWorld) {
   await expect(this.tmp.emptyTitle).toBeVisible();
    await expect(this.tmp.emptyTitle).toHaveText("Title is required");
});

When(`the trainer selects an existing module for editing`, async function (this: CustomWorld) {
    await this.tmp.clicklessons();
    await this.tmp.clickeditbtn();
});

When(`the trainer edits the module details`, async function (this: CustomWorld) {
    const data = moduleData[0]!;

    await this.tmp.editTitle(data.EditTitle);
    await this.tmp.editDescription(data.EditDescription);
    await this.tmp.editSummary(data.EditSummary);
});

When(`the trainer saves the changes`, async function (this: CustomWorld) {
   await this.tmp.clickSave();
});

Then(`the trainer should see the updated module details`, async function (this: CustomWorld) {
    const data = moduleData[0]!;

    const expectedModule = data.EditTitle;
    const actualModule = await this.tmp.validModule(expectedModule);

    console.log("EXPECTED UPDATED MODULE:", expectedModule);
    console.log("ACTUAL UPDATED MODULE:", actualModule);
    await expect(actualModule?.trim()).toBe(expectedModule);
});

When(`the trainer selects an existing module for deletion`, async function (this: CustomWorld) {
    await this.tmp.clicklessons();
});

When(`the trainer deletes the module`, async function (this: CustomWorld) {
    await this.tmp.clickDelete();
});

When(`the trainer confirms the deletion`, async function (this: CustomWorld) {
    await this.tmp.clickConformDelete();
});

Then(`the trainer should not see the deleted module`, async function (this: CustomWorld) {
    const deletedModule = moduleData[0]!.EditTitle;

    const deletedModuleLocator = this.tmp.module.filter({
        hasText: deletedModule
    });

    await expect(deletedModuleLocator).toHaveCount(0, {
        timeout: TIMEOUTS.ASSERTION
    });

    console.log("DELETED MODULE:", deletedModule);
    console.log("Module successfully deleted");
});