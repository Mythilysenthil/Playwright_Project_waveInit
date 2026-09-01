import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
import ParticipantData from '../test-data/ParticipantData.json';

When('click the participant module', async function (this: CustomWorld) {
    await this.ap.clickParticipantModule();
});

When('the admin can click the add participant button', async function (this: CustomWorld) {
    await this.pp.clickAddParticpantPlus();
});

When('the user enters the participant details', async function (this: CustomWorld) {
    await this.pp.setName(ParticipantData.Details.name);
    await this.pp.setEmail(ParticipantData.Details.Email);
});

When('click auto generate password', async function (this: CustomWorld) {
    await this.pp.clickAutoGenerate();
});

When('click add participant button', async function (this: CustomWorld) {
    await this.pp.clickAddParticipant();
});

Then('the admin can see participant added successfully', async function (this: CustomWorld) {
    await expect(this.pp.participantCreated).toContainText('Participant Added');
});

When('the admin clicks the add participant button', async function (this: CustomWorld) {
    await this.pp.clickAddParticpantPlus();
});

When('the user enters the participant details {string} {string} {string}',async function (this: CustomWorld,name: string,email: string,password: string) {
        await this.pp.setName(name);
        await this.pp.setEmail(email);
        await this.pp.setPassword(password);
    }
);

Then('the admin should see the validation message {string}',async function (this: CustomWorld,expectedMessage: string){
        let actualMessage: string;

        if (await this.pp.name.inputValue() === '') {
            actualMessage = await this.pp.getNameValidationMessage();
        } else if (await this.pp.email.inputValue() === '') {
            actualMessage = await this.pp.getEmailValidationMessage();
        } else {
            actualMessage = await this.pp.getPasswordValidationMessage();
        }

        expect(actualMessage).toBe(expectedMessage);
    }
);
When('the user enters the participant details with an existing email', async  function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.pp.setName(ParticipantData.AlreadyExistData.name)
  await this.pp.setAlreadyExistEmail(ParticipantData.AlreadyExistData.Email)
  await this.pp.clickAutoGenerate();
});

Then('the admin should see the email already exists message', async  function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.pp.accountAlreadyExist).toContainText("An account with this email already exists")
});