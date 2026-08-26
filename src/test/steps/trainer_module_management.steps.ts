import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
import { TIMEOUTS } from '../constants/timeouts';
import { CsvReader } from '../utilities/csvReader';
import { ModuleData } from '../types/TrainerModuleData.types';

const moduleData = CsvReader.read<ModuleData>("TrainerModule.csv");

Then(`the trainer navigates to the {string} page`, async function (this: CustomWorld, pageName: string) {
    if (pageName === "My Trainings") {
        await this.tmp.clickMyTrainer();
    }
});

Then(`the trainer should see the assigned course`, async function (this: CustomWorld){
    await expect(this.tmp.course).toBeVisible({
        timeout: TIMEOUTS.ASSERTION
    });
});

When(`the trainer selects the assigned course`, async function (this: CustomWorld){
    await this.tmp.clickCourse();
});

Then(`the trainer should be redirected to the Course Editor page`, async function (this: CustomWorld){
    await expect(this.page).toHaveURL(/https:\/\/www\.waveinitlms\.online\/trainer\?tab=courses&courseId=\d+/,
        {
            timeout: TIMEOUTS.PAGE_LOAD
        });
});

When(`the trainer clicks on the {string} button`, async function (this: CustomWorld,buttonName: string){
    if (buttonName === "Add Module") {
        await this.tmp.clicklessons();
        await this.tmp.clickAddModule();
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