import { Locator, Page } from "@playwright/test";

import { BasePage } from "./BasePage";

export class AIAssistantPage extends BasePage {

    // AI Assistant
    readonly aiAssistantButton: Locator;
    readonly whatShouldIDoNextButton: Locator;
    readonly completeMyProfileButton: Locator;

    // Profile
    readonly alreadyOnProfileMessage: Locator;

    constructor(public page: Page) {

        super(page);

        // AI Assistant button
        this.aiAssistantButton = this.page.getByRole('button', { name: 'Open WAVE INIT AI LMS' });

        // What should I do next button
        this.whatShouldIDoNextButton = this.page.getByRole('button', { name: '✨ What should I do next?' }).nth(1);

        // Complete my profile button
        this.completeMyProfileButton = this.page.getByRole('button', { name: '👤 Complete My Profile' });

        // Already on profile message
        this.alreadyOnProfileMessage = this.page.getByText('✅ You\'re now on your Profile');
    }


    // =========================================================
    // AI ASSISTANT
    // =========================================================

    async clickAIAssistantButton() {

        await this.aiAssistantButton.click();

    }


    async clickWhatShouldIDoNextButton() {

        await this.whatShouldIDoNextButton.click();

    }


    async clickCompleteMyProfileButton() {

        await this.completeMyProfileButton.click();

    }


    // =========================================================
    // VALIDATION
    // =========================================================

    async isAlreadyOnProfileMessageVisible(): Promise<boolean> {

        return await this.alreadyOnProfileMessage.isVisible();

    }

}