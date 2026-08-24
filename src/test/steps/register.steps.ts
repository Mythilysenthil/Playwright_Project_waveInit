import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
import { CsvReader } from '../utilities/csvReader';
import { RegisterData } from '../types/RegisterData.types';

const registerData = CsvReader.read<RegisterData>("RegisterData.csv");

Given('click the signup button', async function (this: CustomWorld) {
    await this.sp.clickSignUpButton();
});

When('I enter valid registration details', async function (this: CustomWorld) {

    const data = registerData[0]!;

    await this.rp.setName(data.Name);
    await this.rp.setEmail(data.Email);
    await this.rp.setMobile(data.Phone);
    await this.rp.setPassword(data.password);
    await this.rp.setConfirmPassword(data.Retype_Password);
    await this.rp.checkAcceptTerms();
});

When('I submit the registration form', async function (this: CustomWorld) {
    await this.rp.clickCreateAccount();
});

Then(
    'I should see a confirmation message indicating successful registration',
    async function (this: CustomWorld) {

        await expect(this.rp.RegistrationSuccessMessage).toBeVisible();

        await expect(this.rp.RegistrationSuccessMessage)
            .toHaveText(/Registration submitted successfully! Your account/);
    }
);


// ======================================================
// INVALID REGISTRATION
// ======================================================

When(
    'the user enters the {string}, {string}, {string}, {string} and {string}',
    async function (
        this: CustomWorld,
        name: string,
        email: string,
        phone: string,
        password: string,
        confirmPassword: string
    ) {

        await this.rp.setName(name);
        await this.rp.setEmail(email);
        await this.rp.setMobile(phone);
        await this.rp.setPassword(password);
        await this.rp.setConfirmPassword(confirmPassword);

        // Accept terms
        await this.rp.checkAcceptTerms();
    }
);


When(
    'the user clicks the Create Account button',
    async function (this: CustomWorld) {

        await this.rp.clickCreateAccount();
    }
);


Then(
    'the user should can see the {string}',
    async function (
        this: CustomWorld,
        expectedMessage: string
    ) {

        // ==========================================
        // Browser HTML5 validation message
        // ==========================================

        if (expectedMessage === 'Please fill out this field.') {

            let message = '';

            // Check Name field
            message = await this.rp.NameInput.evaluate(
                element =>
                    (element as HTMLInputElement).validationMessage
            );

            // Check Email field
            if (!message) {
                message = await this.rp.EmailInput.evaluate(
                    element =>
                        (element as HTMLInputElement).validationMessage
                );
            }

            // Check Phone field
            if (!message) {
                message = await this.rp.MobileInput.evaluate(
                    element =>
                        (element as HTMLInputElement).validationMessage
                );
            }

            expect(message).toBe(expectedMessage);
        }


        else if (expectedMessage === 'Passwords do not match') {

            await expect(this.rp.passwordMismatchMessage)
                .toHaveText(expectedMessage);
        }
    }
);