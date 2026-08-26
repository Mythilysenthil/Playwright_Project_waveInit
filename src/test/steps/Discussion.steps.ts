import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
import { Question } from '../test-data/Question.json'
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
  await this.cp.setDiscussion(Question.validQuestion)
});

When('click Post', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.cp.clickCreatePost();
});

Then('user can see post is created', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.cp.postCreated).toBeVisible();
});
Then('user can see the required validation messages', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  let message = "";

      message = await this.cp.questionInput.evaluate(
        (element) => (element as HTMLInputElement).validationMessage,
      );
    await expect(message).toContain("Please fill out this field.")
});
When('select the created post by {string}', async function (this:CustomWorld,string) {
  // Write code here that turns the phrase above into concrete actions
  if(string == "Discussion"){
    await this.cp.clickDiscussionOption();
  }else{
    await this.cp.clickQuestionoption();
  }
});

When('click Delete', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.cp.deletePost();
});

Then('user can see the discussion post is deleted successfully', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.cp.postDeleted).toBeVisible();
  await expect(this.cp.postDeleted).toContainText("Post deleted successfully.")
});
