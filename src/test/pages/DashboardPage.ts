import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage{
    readonly MyCourse:Locator;
    constructor(page:Page){
        super(page);
        this.MyCourse=this.page.locator("//span[normalize-space()='My Courses']");
    }
    async clickMycourse(){
        await this.Click(this.MyCourse)
    }
}