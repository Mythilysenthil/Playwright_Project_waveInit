import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AdminInterviewPage extends BasePage {
    readonly viewDetailsButton: Locator;
    readonly interviewDetailsHeading: Locator;
    readonly editInterviewButton: Locator;
    readonly saveChangesButton: Locator;
    readonly cancelButton: Locator;
    readonly interviewUpdated: Locator;
    readonly interviewPageTitle: Locator;

    // Interview Status Filters
    readonly allFilter: Locator;
    readonly scheduledFilter: Locator;
    readonly inProgressFilter: Locator;
    readonly completedFilter: Locator;
    readonly cancelledFilter: Locator;

    // Change Status
    readonly changeStatusButton: Locator;

    // Interview Status
    readonly scheduledStatus: Locator;
    readonly inProgressStatus: Locator;
    readonly completedStatus: Locator;
    readonly cancelledStatus: Locator;

    constructor(page: Page) {
        super(page);

        this.interviewPageTitle = this.page.locator("//h2[@class='reg-admin-title']");
        this.interviewUpdated = this.page.locator("//div[contains(text(),'Interview updated successfully')]");

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

        // Interview Status Filters
        this.allFilter = this.page.locator(
            "//button[normalize-space()='All']"
        );

        this.scheduledFilter = this.page.locator(
            "//button[normalize-space()='Scheduled']"
        );

        this.inProgressFilter = this.page.locator(
            "//button[normalize-space()='In Progress']"
        );

        this.completedFilter = this.page.locator(
            "//button[normalize-space()='Completed']"
        );

        this.cancelledFilter = this.page.locator(
            "//button[normalize-space()='Cancelled']"
        );

        // Change Status
        this.changeStatusButton = this.page.locator(
            "//button[@title='Change Status']"
        ).first();

        // Interview Status
        this.scheduledStatus = this.page.locator(
            "//span[text()='SCHEDULED']"
        ).first();

        this.inProgressStatus = this.page.locator(
            "//span[text()='IN PROGRESS']"
        ).first();

        this.completedStatus = this.page.locator(
            "//span[text()='COMPLETED']"
        ).first();

        this.cancelledStatus = this.page.locator(
            "//span[text()='CANCELLED']"
        ).first();
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

    // Interview Status Filter Methods

    async clickAllFilter() {
        await this.Click(this.allFilter);
    }

    async clickScheduledFilter() {
        await this.Click(this.scheduledFilter);
    }

    async clickInProgressFilter() {
        await this.Click(this.inProgressFilter);
    }

    async clickCompletedFilter() {
        await this.Click(this.completedFilter);
    }

    async clickCancelledFilter() {
        await this.Click(this.cancelledFilter);
    }

    // Change Status Method

    async clickChangeStatus() {
        await this.Click(this.changeStatusButton.first());
    }

    // Status Verification Methods

    async verifyScheduledStatus() {
        await this.scheduledStatus.waitFor({ state: "visible" });
    }

    async verifyInProgressStatus() {
        await this.inProgressStatus.waitFor({ state: "visible" });
    }

    async verifyCompletedStatus() {
        await this.completedStatus.waitFor({ state: "visible" });
    }

    async verifyCancelledStatus() {
        await this.cancelledStatus.waitFor({ state: "visible" });
    }
}