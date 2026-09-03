import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { TIMEOUTS } from "../constants/timeouts";
import { expect } from "@playwright/test";

export class TrainerModulepage extends BasePage {
    readonly page: Page;
    readonly myTrainer: Locator;
    readonly course: Locator;
    readonly verifycourse: Locator;
    readonly lessons: Locator;
    readonly addModulebtn: Locator;
    readonly title: Locator;
    readonly description: Locator;
    readonly summary: Locator;
    readonly createbtn: Locator;
    readonly module: Locator;
    readonly emptyTitle: Locator;
    readonly editbtn: Locator;
    readonly deletebtn: Locator;
    readonly conformDelete: Locator;
    readonly welcomeTrainer: Locator;
    readonly courseEditorTabs: Locator;
    readonly myTainingModule:Locator    

    constructor(page: Page) {
        super(page);

        this.page = page;
        this.welcomeTrainer = page.getByText(/Welcome back,\s*trainer01!/i);
        this.myTrainer = page.locator("//button/span[contains(text(), 'My Trainings')]");
        this.course = page.locator("//button/span[contains(text(), 'React Fundamental')]");
        this.verifycourse = page.locator("//h1[contains(text(), 'React Fundamental')]");
        this.lessons = page.locator("//div[@class='wl-detail-tabs-list']/button[2]");
        this.courseEditorTabs = page.locator("//div[@class='wl-detail-tabs-list']");

        this.addModulebtn = page.locator("//div[@class='wl-lessons-header']/button");
        this.title = page.locator("//label[contains(text(), 'Title ')]/following-sibling::input");
        this.description = page.locator("//label[contains(text(), 'Description')]/following-sibling::textarea[1]");
        this.summary = page.locator("//label[contains(text(), 'Description')]/following-sibling::textarea[2]");
        this.createbtn = page.locator("//div[@class='wl-modal-actions']/button[@type='submit']");
        this.module = page.locator("//div[@class='wl-module-row-header']/span[@class='wl-module-title']");
        this.emptyTitle = page.locator("//div[text()='Title is required']");
        this.editbtn = page.locator("(//div[@class='wl-module-actions']/button[@title='Edit'])[1]");
        this.deletebtn = page.locator("(//div[@class='wl-module-actions']/button[@title='Delete'])[1]");
        this.conformDelete = page.locator("//div[@class='wam-actions']/button/span[text()='Delete Lesson']");
        this.myTainingModule=page.locator("//span[normalize-space()='My Trainings']")
    }
    
    async clickCourse(){
        await this.Click(this.course)
    }

    async clicklessons(){
        await this.Click(this.lessons)
    }

    async clickAddModule(){
        await this.Click(this.addModulebtn)
    }

    async enterTitle(title: string){
        await this.Fill(this.title, title);
    }

    async enterDescription(description: string){
        await this.Fill(this.description, description);
    }

    async enterSummary(summary: string){
        await this.Fill(this.summary, summary);
    }

    async clickCreatebtn(){
        await this.Click(this.createbtn)
    }

    async validModule(expectedTitle: string) {
        const module = this.module.filter({ hasText: expectedTitle });
        return await module.first().textContent();
    }

    async isModuleVisible(moduleTitle: string) {
        const module = this.module.filter({
            hasText: moduleTitle
        });
        return await module.first().isVisible().catch(() => false);
    }
    async clickMyTrainigModule(){
        await this.Click(this.myTainingModule);
    }
    async clickeditbtn(){
        await this.Click(this.editbtn);
    }

    async editTitle(title: string) {
        await this.Fill(this.title, title);
    }

    async editDescription(description: string) {
        await this.Fill(this.description, description);
    }

    async editSummary(summary: string) {
        await this.Fill(this.summary, summary);
    }

    async clickSave() {
        await this.Click(this.createbtn);
    }

    async clickDelete(){
        await this.Click(this.deletebtn);
    }

    async clickConformDelete(){
        await this.Click(this.conformDelete);
    }
}