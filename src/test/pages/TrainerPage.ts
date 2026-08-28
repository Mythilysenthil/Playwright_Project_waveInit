import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TrainerPage extends BasePage{
    readonly trainerSearchBar;
    readonly trainerNames;
    readonly noTrainerFound;
    readonly deleteButton:Locator;
    readonly confirmDelete:Locator;
    readonly trainerDeleted:Locator;
    readonly viewDetailsButton:Locator
    readonly viewProfile:Locator;
    constructor(page:Page){
        super(page);
        this.trainerSearchBar=this.page.locator("//input[@placeholder='Search trainers...']")
        this.trainerNames=this.page.locator("//tr/td[1]");
        this.noTrainerFound=this.page.locator("//h3[normalize-space()='No Trainers Found']")
        this.deleteButton=this.page.locator("//button[@title='Delete Trainer']").first();
        this.confirmDelete=this.page.locator("//button[@class='reg-admin-btn reg-admin-btn--danger']")
        this.trainerDeleted=this.page.locator("//div[contains(text(),'Trainer deleted successfully')]")
        this.viewDetailsButton=this.page.locator("//button[@title='View Details']").first();
        this.viewProfile=this.page.locator("//h3[@class='tpm-title']")
    }
    
    async setName(name:string){
        await this.TypeText(this.trainerSearchBar,name)
    }
    async getTrainerNames(){
        await this.trainerNames.first().waitFor({ state: "visible" });
        return await this.GetAllTextContents(this.trainerNames)
    }
    async clickDelete(){
        await this.Click(this.deleteButton)
    }
    async clickConfirmDelete(){
        await this.Click(this.confirmDelete)
        await this.trainerDeleted.waitFor({state:"visible"})
    }
    async clickViewDetails(){
        await this.Click(this.viewDetailsButton)
    }
}