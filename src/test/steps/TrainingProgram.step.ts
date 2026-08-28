import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/CustomWorld";
import { expect } from "@playwright/test";
import CourseData from "../test-data/CourseData.json"
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

When("The user enters the valid search title",async function (this: CustomWorld) {
        await this.tp.setCourse(CourseData.CourseSearch.validTitle);
    }
);

Then("Only valid courses should be shown",async function (this: CustomWorld) {
        const courses = await this.tp.getAllCourses();

        expect(courses.length).toBeGreaterThan(0);

        for (const course of courses) {
            expect(course.toLowerCase()).toContain("playwright");
        }
    }
);

When("The user enters the valid trainer name", async function (this: CustomWorld) {
        await this.tp.setCourse(CourseData.CourseSearch.validTrainer);
    }
);

Then("Only courses associated with the trainer should be shown", async function (this: CustomWorld) {
        const courses = await this.tp.getAllCourses();

        expect(courses.length).toBeGreaterThan(0);
    }
);

When("The user enters an invalid search title",async function (this: CustomWorld) {
        await this.tp.setCourse(CourseData.CourseSearch.invalidTitle);
    }
);

Then("No courses should be shown",
    async function (this: CustomWorld) {
      await expect(this.tp.noCourseFound).toContainText("No Trainings Found")
    }
);

When("The user enters an invalid trainer name",
    async function (this: CustomWorld) {
        await this.tp.setCourse(CourseData.CourseSearch.invalidTrainer);
    }
);
When('click view details of the searched course', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.tp.clickViewdetails();
});

Then('show details of the course', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.tp.trainingDetails).toContainText("Training Details")
});
When('the user clicks the {string} training filter',async function (this: CustomWorld, filter: string) {

        switch (filter) {
            case "Active":
                await this.tp.clickActive();
                break;

            case "Upcoming":
                await this.tp.clickUpcoming();
                break;

            case "Completed":
                await this.tp.clickCompleted();
                break;

            default:
                throw new Error(`Invalid training filter: ${filter}`);
        }
    }
);


Then('only {string} training programs should be displayed',async function (this: CustomWorld, expectedStatus: string) {
  if (expectedStatus === "Active") {
            // All filter can contain Active, Upcoming and Completed
            const statuses = await this.tp.getAllStatuses();

            expect(statuses.length).toBeGreaterThan(0);
            return;
        }
        const statuses = await this.tp.getAllStatuses();
        expect(statuses.length).toBeGreaterThan(0);

        for (const status of statuses) {
            expect(status.trim().toUpperCase())
                .toBe(expectedStatus.toUpperCase());
        }
    }
);
When('the user clicks the edit training button', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.tp.clickEdit();
});

When('the user clicks the Update Training Session button', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.tp.clickSaveButton();
});

Then('the user should see the training session updated successfully', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.tp.trainingUpdated).toBeVisible();

});

When('the user clicks the leaderboard button', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.tp.clickLeaderBoard();
});

Then('the user should see the training leaderboard', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.tp.leaderBoard).toBeVisible();
});
