import {Locator, Page } from "@playwright/test";
import { getEnv } from "../utilities/envReader";
import { logger } from "../utilities/logger";

export class BasePage {
    constructor(public page: Page) {}

    async Navigate(): Promise<void> {
        try {
            const url = getEnv();
            logger.info(`Application Launching: ${url}`);
            await this.page.goto(url, {
                waitUntil: 'domcontentloaded'
            });
        } catch (error) {
            logger.error(`Failed to launch application: ${error}`);
            throw error;
        }
    }

    async Click(locator: Locator): Promise<void> {
        try {
            logger.info('Clicking element');
            await locator.click();
            logger.info('Element clicked successfully');
        } catch (error) {
            logger.error(`Failed to click element: ${error}`);
            throw error;
        }
    }

    async Fill(locator: Locator, message: string): Promise<void> {
        try {
            logger.info('Typing message');
            await locator.fill(message);
            logger.info('Message typed on the locator successfully');
        } catch (error) {
            logger.error(`Failed to fill: ${error}`);
            throw error;
        }
    }

    async GetText(locator: Locator): Promise<string> {
        try {
            logger.info('Getting text');
            return await locator.innerText();
        } catch (error) {
            logger.error(`Failed to get text: ${error}`);
            throw error;
        }
    }
}