import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AdminPage extends BasePage{
    readonly adminPortal:Locator;
    
    constructor(page:Page){
        super(page);
        this.adminPortal=this.page.locator("//div[@class='wl-sidebar-tagline']");
    }
    
}