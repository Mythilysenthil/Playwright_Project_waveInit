import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TrainerModulepage extends BasePage {
    readonly page: Page;
    readonly myTrainer: Locator;
    readonly course: Locator;
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

    constructor(page: Page) {
        super(page);

        this.page = page;
        this.myTrainer = page.locator("(//div/button[@class='wl-sidebar-item '])[1]");
        this.course = page.locator("//div[@class='tmt-course-cell-info']/h3");
        this.lessons = page.locator("//div[@class='wl-detail-tabs-list']/button[2]");
        this.addModulebtn = page.locator("//div[@class='wl-lessons-header']/button");
        this.title = page.locator("//form[@class='wl-modal-card']/input");
        this.description = page.locator("//form[@class='wl-modal-card']/textarea[1]");
        this.summary = page.locator("//form[@class='wl-modal-card']/textarea[2]");
        this.createbtn = page.locator("//div[@class='wl-modal-actions']/button[@type='submit']");
        this.module = page.locator("//div[@class='wl-module-row-header']/span[@class='wl-module-title']");
        this.emptyTitle = page.locator("//div[text()='Title is required']");
        this.editbtn = page.locator("(//div[@class='wl-module-actions']/button[@title='Edit'])[1]");
        this.deletebtn = page.locator("(//div[@class='wl-module-actions']/button[@title='Delete'])[1]");
        this.conformDelete = page.locator("//div[@class='wam-actions']/button/span[text()='Delete Lesson']");
    }

    async clickMyTrainer(){
        await this.Click(this.myTrainer)
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