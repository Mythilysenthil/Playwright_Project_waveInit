import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class part_prof_mgmt_page extends BasePage {
    readonly learner_btn: Locator;
    readonly enterEmail: Locator;
    readonly enterPassword: Locator;
    readonly login_btn: Locator;
    readonly profile_sidebar_btn: Locator;
    readonly addSkill_btn: Locator;
    readonly skillName_input: Locator;
    readonly addskillConfirm_btn: Locator;
    readonly cancelskillConfirm_btn: Locator;
    readonly removeSkill_btn: Locator;
    readonly cancel_delete_btn: Locator;
    readonly Confirm_delete_btn: Locator;

    constructor(public page: Page) {
        super(page);
        this.learner_btn = this.page.locator("//div[@class='auth-role-selector']/child::button[3]");
        this.enterEmail = this.page.locator("//input[@placeholder='Enter your email']");
        this.enterPassword = this.page.locator("//input[@placeholder='Enter your password']");
        this.login_btn = this.page.locator("//button[@class='auth-submit-btn']");
        this.profile_sidebar_btn = this.page.locator("//nav[@class='wl-sidebar-nav']/child::div[5]/descendant::button");
        this.addSkill_btn = this.page.locator("//button[text()=' Add Skill']");
        this.skillName_input = this.page.locator("//form[@class='pfd-field']/child::input");
        this.addskillConfirm_btn = this.page.locator("//div[@class='pfd-footer']/child::button[2]");
        this.cancelskillConfirm_btn = this.page.locator("//div[@class='pfd-footer']/child::button[1]");
        this.removeSkill_btn = this.page.locator("//button[@type='button']/ancestor::span/child::button");
        this.cancel_delete_btn = this.page.locator("//div[@class='pfd-footer']/child::button[1]");
        this.Confirm_delete_btn = this.page.locator("//div[@class='pfd-footer']/child::button[2]");
    }

    async signIn(email: string, password: string): Promise<void> {
        await this.Click("//div[@class='auth-role-selector']/child::button[3]");
        await this.TypeText("//input[@placeholder='Enter your email']", email);
        await this.TypeText("//input[@placeholder='Enter your password']", password);
        await this.Click("//button[@class='auth-submit-btn']");
    }

    async openProfileManagement(): Promise<void> {
        await this.Click("//nav[@class='wl-sidebar-nav']/child::div[5]/descendant::button");
    }

    async clickAddSkill(): Promise<void> {
        await this.Click("//button[text()=' Add Skill']");
    }

    async enterSkillName(skillName: string): Promise<void> {
        await this.TypeText("//form[@class='pfd-field']/child::input", skillName);
        await this.skillName_input.press('Enter');
    }

    async confirmAddSkill(): Promise<void> {
        await this.Click("//div[@class='pfd-footer']/child::button[2]");
    }

    async cancelSkillDialog(): Promise<void> {
        await this.Click("//div[@class='pfd-footer']/child::button[1]");
    }

    async deleteFirstSkill(): Promise<void> {
        await this.Click("//button[@type='button']/ancestor::span/child::button");
    }

    async confirmSkillDeletion(): Promise<void> {
        await this.Click("//div[@class='pfd-footer']/child::button[2]");
    }

    async getSkillCount(): Promise<number> {
        return this.removeSkill_btn.count();
    }
}
