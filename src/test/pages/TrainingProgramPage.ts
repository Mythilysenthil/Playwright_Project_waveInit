import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TrainigProgramPage extends BasePage{
    readonly createTraining:Locator;
    readonly trainingTitle:Locator;
    readonly description:Locator
    readonly assignTrainer:Locator;
    readonly selectTrainer:Locator;
    readonly startDateAndTime:Locator;
    readonly endDateAndTime:Locator
    readonly createTrainingSession:Locator;
    readonly trainingCreated:Locator;
    readonly trainerRequired:Locator;
    constructor(page:Page){
        super(page);
        this.createTraining=this.page.locator("//button[@class='reg-admin-btn reg-admin-btn--primary']")
        this.trainingTitle=this.page.locator("//input[@placeholder='e.g. React Fundamentals']")
        this.description=this.page.locator("//textarea[@placeholder='Training objectives and content overview...']")
        this.assignTrainer=this.page.locator("//input[@placeholder='Search trainers by name or email...']");
        this.selectTrainer=this.page.locator("//span[@style='font-size: 12.5px; font-weight: 600; overflow-wrap: anywhere;']").first();
        this.startDateAndTime = this.page.locator("input[type='datetime-local']").nth(0);
        this.endDateAndTime = this.page.locator("input[type='datetime-local']").nth(1);
        this.createTrainingSession=this.page.locator("//button[@type='submit']");
        this.trainingCreated=this.page.locator("//body/div[@id='root']/div[@class='fixed bottom-6 right-6 z-[999999] flex flex-col-reverse gap-2.5 pointer-events-none']/div[@class='pointer-events-auto']/div/div[1]")
        this.trainerRequired=this.page.locator("//div[contains(text(),'Trainer ID or Trainer IDs is required')]")
    }
    async clickAddCreateTraining(){
        await this.Click(this.createTraining)
    }
    async setTrainingTitle(title:string){
        await this.TypeText(this.trainingTitle,title)
    }
    async setDescription(description:string){
        await this.TypeText(this.description,description)
    }
    async setTrainerAndSelect(trainer:string){
        await this.TypeText(this.assignTrainer,trainer)
        await this.Click(this.selectTrainer)
    }
    async setStartDateAndTime(dateTime: string): Promise<void> {
    await this.SetDateTime(this.startDateAndTime, dateTime);
    }

    async setEndDateAndTime(dateTime: string): Promise<void> {
    await this.SetDateTime(this.endDateAndTime, dateTime);
    }
    async clickCreateTraining(){
        await this.Click(this.createTrainingSession)
    }
}