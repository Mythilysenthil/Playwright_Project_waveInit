import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AdminPage extends BasePage{
    readonly adminPortal:Locator;
    readonly TrainigProgram:Locator;
    constructor(page:Page){
        super(page);
        this.adminPortal=this.page.locator("//div[@class='wl-sidebar-tagline']");
        this.TrainigProgram=this.page.locator("//span[normalize-space()='Training Programs']")
    }
    async clickTrainingProgram(){
        await this.Click(this.TrainigProgram)
    }
}