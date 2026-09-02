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

When(
    'the user enters the participant details {string} {string} {string}',
    async function (
        this: CustomWorld,
        name: string,
        email: string,
        password: string
    ) {
        await this.pp.setName(name);
        await this.pp.setEmail(email);
        await this.pp.setPassword(password);
    }
);

Then(
    'the admin should see the validation message {string}',
    async function (this: CustomWorld, expectedMessage: string) {
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

When(
    'the user enters the participant details with an existing email',
    async function (this: CustomWorld) {
        await this.pp.setName(ParticipantData.AlreadyExistData.name);
        await this.pp.setAlreadyExistEmail(ParticipantData.AlreadyExistData.Email);
        await this.pp.clickAutoGenerate();
    }
);

Then(
    'the admin should see the email already exists message',
    async function (this: CustomWorld) {
        await expect(this.pp.accountAlreadyExist).toContainText(
            "An account with this email already exists"
        );
    }
);

When('the admin clicks the Rejected filter', async function (this: CustomWorld) {
    await this.pp.clickRejectedFilter();
});

Then('only rejected participants should be displayed', async function (this: CustomWorld) {
    const statuses = await this.pp.getParticipantStatuses();

    expect(statuses.length).toBeGreaterThan(0);

    for (const status of statuses) {
        expect(status.trim()).toBe('REJECTED');
    }
});

When('the admin clicks the Pending filter', async function (this: CustomWorld) {
    await this.pp.clickPendingFilter();
});

Then('only pending participants should be displayed', async function (this: CustomWorld) {
    const statuses = await this.pp.getParticipantStatuses();

    expect(statuses.length).toBeGreaterThan(0);

    for (const status of statuses) {
        expect(status.trim()).toBe('PENDING');
    }
});

When('the admin clicks the Approved filter', async function (this: CustomWorld) {
    await this.pp.clickApprovedFilter();
});

Then('only approved participants should be displayed', async function (this: CustomWorld) {
    const statuses = await this.pp.getParticipantStatuses();

    expect(statuses.length).toBeGreaterThan(0);

    for (const status of statuses) {
        expect(status.trim()).toBe('APPROVED');
    }
});

Then('all participants should be displayed', async function (this: CustomWorld) {
    const statuses = await this.pp.getParticipantStatuses();

    expect(statuses.length).toBeGreaterThan(0);
});

When(
    'the admin clicks the view participant profile button',
    async function (this: CustomWorld) {
        await this.pp.clickViewParticipantProfile();
    }
);

Then(
    'the participant profile should be displayed',
    async function (this: CustomWorld) {
        const profileTitle =
            await this.pp.getParticipantProfileTitle();

        expect(profileTitle).toBeTruthy();
    }
);

When(
    'the user selects a pending participant',
    async function (this: CustomWorld) {
        await this.pp.clickPendingFilter();
        await this.pp.clickRejectedFilter();
        await this.pp.clickPendingFilter();
    }
);
When('the user clicks the View button in Pending', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.pp.clickViewParticipantProfile();
});

Then(
    'the participant details should be displayed',
    async function (this: CustomWorld) {
        
        const profileTitle =
            await this.pp.getParticipantProfileTitle();

        expect(profileTitle).toBeTruthy();
    }
);

When(
    'the user clicks the Approve button',
    async function (this: CustomWorld) {
        await this.pp.clickApproveParticipant();
    }
);

Then(
    'the participant should be approved successfully',
    async function (this: CustomWorld) {
        await this.pp.verifyParticipantApproved();
    }
);

When(
    'the user clicks the Reject button',
    async function (this: CustomWorld) {
        await this.pp.clickRejectParticipant();
    }
);

Then(
    'the participant should be rejected successfully',
    async function (this: CustomWorld) {
        await this.pp.verifyParticipantRejected();
    }
);

When(
    'the user clicks the Delete button',
    async function (this: CustomWorld) {
        await this.pp.clickDeleteParticipant();

        // Confirm the delete action
       
    }
);
When('the user confirms the deletion in pending', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
   await this.pp.clickConfirmDelete();
});

Then(
    'the participant should be deleted successfully',
    async function (this: CustomWorld) {
        await expect(this.pp.participantRemoved).toBeTruthy();
    }
);
Then('admin can the participant title in particpant page', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.pp.particpantTitle).toContainText("Participants")
});