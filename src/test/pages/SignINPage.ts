import { Locator, Page } from "@playwright/test";

import { BasePage } from "./BasePage";
export class SignINPage extends BasePage {

    // Existing
    readonly signUpButton: Locator;

    // Learner Login
    readonly learnerButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInAsLearnerButton: Locator;

    // Error messages
    readonly popupErrorMessage: Locator;
    readonly errorMessage: Locator;

    constructor(public page: Page) {

        super(page);

        // Sign Up button
        this.signUpButton = this.page.locator(
            "//a[@class='auth-footer-link']"
        );

        // Learner button
        this.learnerButton = this.page.getByRole("button", {
            name: "Learner"
        });

        // Email field
        this.emailInput = this.page.getByRole('textbox', { name: 'Username or Email' });

        // Password field
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });

        // Sign in as Learner button
        this.signInAsLearnerButton = this.page.getByRole('button', { name: 'Sign in as Learner' });

        // Popup error message
        this.popupErrorMessage = this.page.locator('div').filter({ hasText: 'Invalid email or password' }).nth(4);

        // Validation error message
        this.errorMessage = this.page.getByRole('textbox', { name: 'Password' });
    }


    // =========================================================
    // SIGN UP
    // =========================================================

    async clickSignUpButton() {

        await this.signUpButton.click();

    }

    // =========================================================
    // LEARNER LOGIN
    // =========================================================

    async clickLearnerButton() {
        await this.learnerButton.click();

    }

    async enterEmail(email: string) {
        await this.emailInput.fill(email);

    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);

    }

    async enterLearnerCredentials(
        email: string,
        password: string
    ) {
        await this.enterEmail(email);
        await this.enterPassword(password);

    }


    async clickSignInAsLearnerButton() {
        await this.signInAsLearnerButton.click();

    }


    // =========================================================
    // ERROR HANDLING
    // =========================================================

    async isPopupErrorVisible(): Promise<boolean> {
        return await this.popupErrorMessage.isVisible();

    }


    async isErrorMessageVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();

    }

}