import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AdminPage extends BasePage{
    readonly adminPortal:Locator;
    readonly TrainigProgram:Locator;
    readonly trainers:Locator;
    readonly addTrainers:Locator;
    readonly fullName:Locator;
    readonly email:Locator;
    readonly trainerCreated:Locator;
    readonly password:Locator;
    readonly confirmPassword:Locator;
    readonly createTrainer:Locator;
    readonly nameRequired:Locator;
    readonly emailRequired:Locator;
    readonly passwordRequired:Locator;
    readonly passwordNotMatch:Locator;
    readonly participantModule:Locator;
    readonly interviewModule:Locator
    constructor(page:Page){
        super(page);
        this.interviewModule=this.page.locator("//span[normalize-space()='Interviews']")
        this.participantModule=this.page.locator("//span[normalize-space()='Participants']")
        this.adminPortal=this.page.locator("//div[@class='wl-sidebar-tagline']");
        this.TrainigProgram=this.page.locator("//span[normalize-space()='Training Programs']")
        this.trainers=this.page.locator("//span[normalize-space()='Trainers']")
        this.addTrainers=this.page.locator("//button[@class='reg-admin-btn reg-admin-btn--primary']")
        this.fullName=this.page.locator("//input[@placeholder='e.g. Sarah Johnson']");
        this.email=this.page.locator("//input[@placeholder='trainer@company.com']")
        this.trainerCreated=this.page.locator("//div[contains(text(),'Trainer created successfully')]")
        this.password=this.page.locator("//input[@placeholder='Min. 8 characters']")
        this.confirmPassword=this.page.locator("//input[@placeholder='Re-enter password']");
        this.createTrainer=this.page.locator("//button[@type='submit']")
        this.nameRequired=this.page.locator("//div[normalize-space()='Full name is required']")
        this.emailRequired=this.page.locator("//div[normalize-space()='Enter a valid email address']")
        this.passwordRequired=this.page.locator("//div[normalize-space()='Password is required']")
        this.passwordNotMatch=this.page.locator("//div[normalize-space()='Passwords do not match']")
    }
    async clickInterviewModoule(){
        await this.Click(this.interviewModule)
    }
    async clickTrainingProgram(){
        await this.Click(this.TrainigProgram)
    }
    async clickTrainers(){
        await this.Click(this.trainers)
    }
    async clickAddTrainer(){
        await this.Click(this.addTrainers)
    }
    async clickParticipantModule(){
        await this.Click(this.participantModule)
    }
    async setName(name:string){
        await this.TypeText(this.fullName,name)
    }
    async setEmail(email:string){
        await this.TypeText(this.email,email+Date.now().toString()+"@gmail.com")
    }
    async setPassword(pass:string){
        await this.TypeText(this.password,pass)
    }
    async setRetypePassword(repassword:string){
        await this.TypeText(this.confirmPassword,repassword)
    }
    async clickCreateTrainer(){
        await this.Click(this.createTrainer)
    }
    async setExactEmail(email:string){
        await this.TypeText(this.email,email)
    }
}