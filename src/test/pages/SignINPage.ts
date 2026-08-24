import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignINPage extends BasePage {
    readonly signUpButton:Locator;
    constructor(public page: Page) {
        super(page);
        this.signUpButton =this.page.locator("//a[@class='auth-footer-link']");
    }
    async clickSignUpButton() {
        await this.signUpButton.click();
    }
}