import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
When('click trainer module', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.ap.clickTrainers();
});

When('the user clicks the Add Trainer button', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.ap.clickAddTrainer();
});

When('the user enters valid trainer account details', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.ap.setName("Tamil")
  await this.ap.setEmail("tamil");
  await this.ap.setPassword("Kiot@1234")
  await this.ap.setRetypePassword("Kiot@1234")
});

When('the user clicks the Create Trainer button', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.ap.clickCreateTrainer();
});

Then('the trainer account should be created successfully', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.ap.trainerCreated).toBeVisible();
});
When('the user enters the following trainer details:',async function (this: CustomWorld, dataTable: DataTable) {

        const data = dataTable.hashes()[0]!;
        if (data['Full Name'] !== undefined && data['Full Name'] !== '') {
            await this.ap.setName(data['Full Name']);
        }

        if (data['Email'] !== undefined && data['Email'] !== '') {
            // Use exact email from DataTable
            await this.ap.setExactEmail(data['Email']);
        }

        if (data['Password'] !== undefined && data['Password'] !== '') {
            await this.ap.setPassword(data['Password']);
        }

        if (
            data['Confirm Password'] !== undefined &&
            data['Confirm Password'] !== ''
        ) {
            await this.ap.setRetypePassword(data['Confirm Password']);
        }
    }
);


Then('the trainer should see the validation message {string}',async function (this: CustomWorld, message: string) {

        switch (message) {

            case 'Full name is required':
                await expect(this.ap.nameRequired).toBeVisible();
                break;

            case 'Enter a valid email address':
                await expect(this.ap.emailRequired).toBeVisible();
                break;

            case 'Password is required':
                await expect(this.ap.passwordRequired).toBeVisible();
                break;

            case 'Passwords do not match':
                await expect(this.ap.passwordNotMatch).toBeVisible();
                break;
            default:
                throw new Error(
                    `Validation message "${message}" is not handled`
                );
        }
    }
);