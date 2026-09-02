
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AdminInterviewPage extends BasePage {
    readonly viewDetailsButton: Locator;
    readonly interviewDetailsHeading: Locator;
    readonly editInterviewButton: Locator;
    readonly saveChangesButton: Locator;
    readonly cancelButton: Locator;
    readonly interviewUpdated:Locator;
    readonly interviewPageTitle:Locator

    constructor(page: Page) {
        super(page);
        this.interviewPageTitle=this.page.locator("//h2[@class='reg-admin-title']")
        this.interviewUpdated=this.page.locator("//div[contains(text(),'Interview updated successfully')]")
        this.viewDetailsButton = this.page.locator(
            "//button[@title='View Details']"
        );

        this.interviewDetailsHeading = this.page.locator(
            "//h3[normalize-space()='Interview Details']"
        );

        this.editInterviewButton = this.page.locator(
            "//button[@title='Edit Interview']"
        );

        this.saveChangesButton = this.page.locator(
            "//button[normalize-space()='Save Changes']"
        );

        this.cancelButton = this.page.locator(
            "//button[normalize-space()='Cancel']"
        );
    }

    async clickViewDetails() {
        await this.Click(this.viewDetailsButton.first());
    }

    async verifyInterviewDetailsDisplayed() {
        await this.interviewDetailsHeading.waitFor({ state: "visible" });
    }

    async clickEditInterview() {
        await this.Click(this.editInterviewButton.first());
    }

    async clickSaveChanges() {
        await this.Click(this.saveChangesButton);
    }

    async clickCancel() {
        await this.Click(this.cancelButton);
    }
}
