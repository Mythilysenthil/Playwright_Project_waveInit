import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/CustomWorld";
import { expect } from "@playwright/test";
import { CsvReader } from "../utilities/csvReader";
import { ParticipantData } from "../types/ParticipantData.types";

const searchdata = CsvReader.read<ParticipantData>("InviteParticipantData.csv");

When(
  "the trainer clicks My Training Module",
  async function (this: CustomWorld) {
    await this.tmp.clickMyTrainigModule();
  },
);

When(
  "the trainer clicks any course and clicks Invite Participant",
  async function (this: CustomWorld) {
    await this.tmp.clickCourse();
    await this.tcp.clickParticipant();
    await this.tcp.clickInvitePartcipant();
  },
);

When(
  "the trainer enters a valid participant name",
  async function (this: CustomWorld) {
    const participantName = searchdata[0]!.ValidParticipant;

    await this.tcp.setParticipant(participantName);
  },
);

Then(
  "only the matching participant should be displayed",
  async function (this: CustomWorld) {
    const expectedParticipant = searchdata[0]!.ValidParticipant;

    const allParticipants = await this.tcp.getAllParticipants();

    expect(allParticipants.length).toBeGreaterThan(0);

    for (const participant of allParticipants) {
      expect(participant.toLowerCase()).toContain(
        expectedParticipant.toLowerCase(),
      );
    }
  },
);
When(
  "the trainer enters an invalid participant name",
  async function (this: CustomWorld) {
    const invalidParticipant = searchdata[0]!.InvalidParticipant;
    await this.tcp.setParticipant(invalidParticipant);
  },
);
Then(
  "no matching participant should be displayed",
  async function (this: CustomWorld) {
    const allParticipants = await this.tcp.getAllParticipants();
    expect(allParticipants).toHaveLength(0);
  },
);
When(
    'the trainer selects an approved participant',
    async function (this: CustomWorld) {
        await this.tcp.clickParticipantforCourse();
    }
);

When(
    'the trainer clicks Invite Selected Participants',
    async function (this: CustomWorld) {
        await this.tcp.clickSelectedParticipanted();
    }
);

Then(
    'the participant should be added successfully',
    async function (this: CustomWorld) {
        await expect(this.tcp.particpantAddedSucessfully).toBeVisible();
    }
);
Then(
    'the Invite Selected Participants button should not be enabled',
    async function (this: CustomWorld) {
        await expect(this.tcp.selectInvitedParticipant).toBeDisabled();
    }
);
When('the trainer clicks the Refresh button', async function (this: CustomWorld) {
    await this.tcp.clickRefresh();
});
When('the trainer clicks any course and clicks Invite Participants', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.tmp.clickCourse();
    await this.tcp.clickParticipant();
});


Then('the participant list should be refreshed successfully', async function (this: CustomWorld) {
    await expect(this.tcp.particpantRefreshed)
        .toContainText('Participant list refreshed');
});

