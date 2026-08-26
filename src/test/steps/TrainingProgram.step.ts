import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/CustomWorld";
import { expect } from "@playwright/test";

When("the user clicks Training Programs in the Admin Panel",async function (this: CustomWorld) {
    await this.ap.clickTrainingProgram();
  },
);

When("the user clicks the Add Training button",async function (this: CustomWorld) {
    await this.tp.clickAddCreateTraining();
  },
);

When("the user enters the training title", async function (this: CustomWorld) {
  await this.tp.setTrainingTitle("Playwright Automation");
});

When("the user enters the training description",async function (this: CustomWorld) {
    await this.tp.setDescription("Training program for Playwright automation with TypeScript",);
  },
);

When("the user enters and selects the trainer name",async function (this: CustomWorld) {
    await this.tp.setTrainerAndSelect("Subathra");
  },
);

When(
  "the user sets the start and end dates",
  async function (this: CustomWorld) {
    await this.tp.setStartDateAndTime("2026-08-27T10:00");
    await this.tp.setEndDateAndTime("2026-08-30T17:00");
  },
);

When(
  "the user clicks the Create Training Session button",async function (this: CustomWorld) {
    await this.tp.clickCreateTraining();
  },
);

Then("the user should see the training session created successfully",async function (this: CustomWorld) {
    await expect(this.tp.trainingCreated).toBeVisible();
  },
);

When("the user enters the training title {string}",async function (this: CustomWorld, title: string) {
    if (title) {
      await this.tp.setTrainingTitle(title);
    }
  },
);

When("the user sets the start date {string} and end date {string}",async function (this: CustomWorld, startDate: string, endDate: string) {
    if (startDate) {
      await this.tp.setStartDateAndTime(startDate);
    }

    if (endDate) {
      await this.tp.setEndDateAndTime(endDate);
    }
  },
);

Then("the user should see the validation message {string}",async function (this: CustomWorld, expectedMessage: string) {
    if (expectedMessage === "Please fill out this field.") {
      let message = "";

      message = await this.tp.trainingTitle.evaluate(
        (element) => (element as HTMLInputElement).validationMessage,
      );

      if (!message) {
        message = await this.tp.startDateAndTime.evaluate(
          (element) => (element as HTMLInputElement).validationMessage,
        );
      }

      if (!message) {
        message = await this.tp.endDateAndTime.evaluate(
          (element) => (element as HTMLInputElement).validationMessage,
        );
      }

      expect(message).toBe(expectedMessage);
    }
  },
);
Then('the user should see the trainer validation message {string}', async function (this:CustomWorld,string) {
  await expect(this.tp.trainerRequired).toBeVisible();
  await expect(this.tp.trainerRequired).toContainText(string)
});