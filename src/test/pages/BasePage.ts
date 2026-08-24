import { Locator, Page } from "@playwright/test";
import { getEnv } from "../utilities/envReader";
import { logger } from "../utilities/logger";

export class BasePage {

    constructor(public page: Page) {}

    // Launch the application
    async Navigate(): Promise<void> {
        try {
            const url = getEnv();
            logger.info(`Application Launching: ${url}`);
            await this.page.goto(url, {
                waitUntil: 'domcontentloaded'
            });

            logger.info("Application launched successfully");

        } catch (error) {

            logger.error(`Failed to launch application: ${error}`);

            throw error;
        }
    }

    // Click on an element
    async Click(selector: Locator): Promise<void> {
        try {

            await selector.click();

            logger.info(`Clicked on element successfully`);

        } catch (error) {

            logger.error(`Failed to click on element: ${error}`);

            throw error;
        }
    }

    // Enter text into an input field
    async TypeText(selector: Locator, text: string): Promise<void> {
        try {

            await selector.fill(text);

            logger.info(`Typed text "${text}" into the element`);

        } catch (error) {

            logger.error(`Failed to type text "${text}": ${error}`);

            throw error;
        }
    }

    // Get text from an element
    async GetText(selector: Locator): Promise<string> {
        try {

            const text = await selector.textContent();

            logger.info(`Retrieved text from the element`);

            return text || "";

        } catch (error) {

            logger.error(`Failed to retrieve text from element: ${error}`);

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
}