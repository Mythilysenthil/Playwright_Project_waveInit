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
}