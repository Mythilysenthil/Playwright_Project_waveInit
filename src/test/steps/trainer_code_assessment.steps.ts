import { TIMEOUTS } from './../constants/timeouts';
import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { CustomWorld } from '../world/CustomWorld';
import codingProblems from "../test-data/codingProblems.json";

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

When(`the trainer clicks on the Edit button in the assessment details`,async function (this: CustomWorld) {
    await this.tca.clickEditTab();
});

Then(`the coding assessment edit page should be displayed`, async function (this: CustomWorld) {
    console.log("EDIT PAGE CURRENT URL:", this.page.url());
    const EditPage = await this.tca.isVisibleEditPage();
    console.log("EDIT PAGE VISIBLE:", EditPage);
    expect(EditPage).toBe(true);
});

When(`the trainer enters coding assessment details with title {string}, time limit {string}, and description {string}`,
    async function (this: CustomWorld,title: string,timeLimit: string, description: string){
        await this.tca.enterAssessmentDetails(
            title,
            timeLimit,
            description
        );
});

When(`the trainer saves the coding assessment`,async function (this: CustomWorld) {
    await this.tca.clickSavebtn();
});

Then(`the coding assessment title should be updated to {string}`,async function (this: CustomWorld, title: string) {
    const titleVisible = await this.tca.isAssessmentTitleVisible(title);
        expect(titleVisible).toBe(true);
});

//add problems
When(`the trainer clicks on the Problems tab`, async function (this: CustomWorld) {
    await this.tca.clickProblemBtn();
});

When(`the trainer adds a valid coding problem to the assessment`, async function (this: CustomWorld) {
    const problem = codingProblems[0]; 
    await this.tca.addValidCodingProblem(problem);
});

Then(`the selected coding problem should be added successfully`, async function (this: CustomWorld) {
    await this.tca.isProblemAdded();
});

// empty code assessment
When(`the trainer leaves the mandatory assessment fields empty`, async function (this: CustomWorld) {
    await this.tca.clearMandatoryProblemFields();
});

When(`the trainer saves the coding problem`, async function (this: CustomWorld) {
    await this.tca.clickProblemSave();
});

Then(`the validation messages should be displayed for the mandatory fields`, async function (this: CustomWorld) {
    const validationMessages =await this.tca.getProblemValidationMessages();

    console.log("STEP: Problem validation messages =",validationMessages);
    expect(validationMessages.length).toBeGreaterThan(0);
});

Then(`the coding assessment should remain in {string} status`, async function (this: CustomWorld) {
    const isModalVisible = await this.tca.isAddProblemModalVisible();

    console.log("STEP: Add Problem modal still visible =",isModalVisible);
    expect(isModalVisible).toBe(true)
});


// cancel edit
When(`the trainer clicks on the Cancel button` ,async function (this: CustomWorld) {
    await this.tca.clickCancelbtn();
});

Then(`the trainer should return to the Coding page`, async function (this: CustomWorld) {
    const isVisibleEditTab = await this.tca.edittab;
    expect(isVisibleEditTab).toBeVisible();
});

//Code generate with AI
When(`the trainer clicks on the Generate with AI button`, async function (this: CustomWorld) {
    await this.tca.clickgenerateAIBtn();
});

Then(`the AI coding assessment generation option should be displayed`, async function (this: CustomWorld) {
    expect (await this.tca.genarateOption).toBeVisible({timeout: TIMEOUTS.ASSERTION});
});

When(`the trainer enters the topic {string}`, async function (this: CustomWorld, topic:string) {
    await this.tca.setPrompt(topic);
});

When(`the trainer clicks on the Generate Assessment button`, async function (this: CustomWorld) {
    await this.tca.clickGenerateAssessment();
});

Then(`the coding assessment created success message should be displayed`, async function (this: CustomWorld) {
    expect(await this.tca.AIcreateMsg).toBeVisible({timeout: TIMEOUTS.PAGE_LOAD});
});

//Code generate with AI - empty field
When(`the trainer leaves the topic field empty`, async function (this: CustomWorld) {
    await this.tca.emptyPrompt();
});

Then(`the topic validation message should be displayed {string}`, async function (this: CustomWorld, expectedMessage: string) {
    const actualMessage = await this.tca.getValidationMessage(this.tca.prompt);
    expect(actualMessage).toBe(expectedMessage);
});