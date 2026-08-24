import { Page } from "@playwright/test";
import { getEnv } from "../utilities/envReader";
import { logger } from "../utilities/logger";

export class BasePage {
    constructor(public page: Page) {}

    async Navigate(): Promise<void> {
        try {
            const url = getEnv();

            logger.info(`Application Launching: ${url}`);

            await this.page.goto(url, {
                waitUntil: "domcontentloaded"
            });
        } catch (error) {
            logger.error(`Failed to launch application: ${error}`);
            throw error;
        }
    }
    async Click(selector: string): Promise<void> {
        try {
            await this.page.click(selector);
            logger.info(`Clicked on element with selector: ${selector}`);
        } catch (error) {
            logger.error(`Failed to click on element with selector ${selector}: ${error}`);
            throw error;
        }
    }
    async TypeText(selector: string, text: string): Promise<void> {
        try {
            await this.page.fill(selector, text);
            logger.info(`Typed text "${text}" into element with selector: ${selector}`);
        } catch (error) {
            logger.error(`Failed to type text into element with selector ${selector}: ${error}`);
            throw error;
        }
    }
    async GetText(selector: string): Promise<string> {
        try {
            const text = await this.page.textContent(selector);
            logger.info(`Retrieved text from element with selector: ${selector}`);
            return text || '';
        } catch (error) {
            logger.error(`Failed to retrieve text from element with selector ${selector}: ${error}`);
            throw error;
        }
    }

}