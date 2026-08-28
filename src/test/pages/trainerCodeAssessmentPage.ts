import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { TIMEOUTS } from "../constants/timeouts";
import { promises } from "node:dns";

export class TrainerCodeAssessmentpage extends BasePage {
    readonly page: Page;
    readonly coding: Locator;
    readonly createAssessment: Locator;
    readonly assCreationMsg: Locator;
    readonly draftAss: Locator;
    readonly editbtn: Locator;
    readonly editPageTxt: Locator;

    constructor(page: Page) {
        super(page);

        this.page = page;
        this.coding = page.locator("//div[@class='wl-detail-tabs-list']/button[4]");
        this.createAssessment = page.locator( "//div[@class='cct-actions']/button[@class='cct-btn-primary']");
        this.assCreationMsg = page.locator("//div[text()='Assessment created (DRAFT)']");
        this.draftAss = page.locator("//tbody/tr/td[4]/span").first();
        this.editbtn = page.locator("//button[@title='Edit Assessment']").first();
        this.editPageTxt = page.locator("//div/h1[contains(text(),'Untitled Coding Assessment')]");
    }


    async clickCoding() {
        await this.Click(this.coding);
    }

    async clickCreateAssessment(): Promise<void> {
        console.log("PAGE OBJECT: Starting Create Assessment");

        await this.createAssessment.waitFor({
            state: "visible",
            timeout: TIMEOUTS.PAGE_LOAD
        });

        await expect(this.createAssessment).toBeEnabled({
            timeout: TIMEOUTS.ASSERTION
        });
        await this.Click(this.createAssessment);

        console.log("PAGE OBJECT: Create Assessment clicked");
    }

    async getSuccessMsg(): Promise<string> {
        await this.assCreationMsg.waitFor({
            state: "visible",
            timeout: TIMEOUTS.ASSERTION
        });
        return await this.GetText(this.assCreationMsg);
    }

    async isVisibleDraft(): Promise<boolean> {
        return await this.IsVisible(this.draftAss);
    }

    async clickEditBtn(): Promise<void> {

    console.log("PAGE OBJECT: Clicking Edit Assessment");

    await this.Click(this.editbtn);

    console.log(
        "PAGE OBJECT: URL after clicking Edit Assessment =",
        this.page.url()
    );
}
    async isVisibleEditPage(): Promise<boolean>{
        return await this.IsVisible(this.editPageTxt);
    }
}