import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LearnerEducation } from "../types/LearnerEducation.types";
import { SocialLinks } from "../types/SocialLinks.types";

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
    readonly Add_Education: Locator;        
    readonly institution: Locator;
    readonly degree: Locator;
    readonly field_of_study: Locator;
    readonly Yearrange: Locator;
    readonly cgpa: Locator;
    readonly requiredIntitution: Locator;
    readonly requiredDegree: Locator;
    readonly addEducationBtn: Locator;
    readonly cancelEducationBtn: Locator;
    readonly delEducationBtn: Locator;
    readonly DeleteEducationConfirmBtn: Locator;
    readonly cancelDeleteEducation: Locator;
    readonly editEducattion: Locator;
    readonly SocialLinksEditBtn: Locator;
    readonly linkedinInput: Locator;
    readonly githubInput: Locator;
    readonly saveSocialLinksBtn: Locator;
    readonly cancelSocialLinksBtn: Locator;
    readonly assertLinkedinText: Locator;
    readonly assertGithubText: Locator;
    

    constructor(public page: Page) {
        super(page);

        this.learner_btn = this.page.locator("//div[@class='auth-role-selector']/child::button[3]");

        this.enterEmail = this.page.locator("//input[@placeholder='Enter your email']");

        this.enterPassword = this.page.locator("//input[@placeholder='Enter your password']");

        this.login_btn = this.page.locator("//button[@class='auth-submit-btn']");

        this.profile_sidebar_btn = this.page.locator("//nav[@class='wl-sidebar-nav']/child::div[5]/descendant::button");

        this.addSkill_btn = this.page.locator("//button[text()=' Add Skill']");

        // Scope these locators to the visible skill dialog.  The page uses the same
        // footer markup for several dialogs, so a page-wide "second button" can
        // resolve to a disabled button while another dialog is being re-rendered.
        this.skillName_input = this.page.locator(".pfd-body:visible form.pfd-field input");

        this.addskillConfirm_btn = this.page.locator(".pfd-footer:visible > button.pfd-btn-primary");

        this.cancelskillConfirm_btn = this.page.locator(".pfd-footer:visible > button:first-child");

        this.removeSkill_btn = this.page.locator("//button[@type='button']/ancestor::span/child::button");

        this.cancel_delete_btn = this.page.locator("//div[@class='pfd-footer']/child::button[1]");

        this.Confirm_delete_btn = this.page.locator("//div[@class='pfd-footer']/child::button[2]");

        this.Add_Education = this.page.locator("//div[normalize-space()='Education']/following-sibling::button[@type='button']");

        this.institution = this.page.locator("//div[@class='pfd-body']/descendant::input[1]");

        this.degree = this.page.locator("//div[@class='pfd-body']/descendant::input[2]");

        this.field_of_study = this.page.locator("//div[@class='pfd-body']/descendant::input[3]");

        this.Yearrange = this.page.locator("//div[@class='pfd-body']/descendant::input[4]");

        this.cgpa = this.page.locator("//div[@class='pfd-body']/descendant::input[5]");

        this.requiredIntitution = this.page.locator("//div[text()='Institution is required.']");

        this.requiredDegree = this.page.locator("//div[text()='Degree is required.']");

        this.addEducationBtn = this.page.locator("//div[@class='pfd-footer']/child::button[2]");

        this.cancelEducationBtn = this.page.locator("//div[@class='pfd-footer']/child::button[1]");

        this.delEducationBtn = this.page.locator("//button[@title='Delete Education']");

        this.DeleteEducationConfirmBtn = this.page.locator("//div[@class='pfd-footer']/child::button[2]");

        this.cancelDeleteEducation = this.page.locator("//div[@class='pfd-footer']/child::button[1]");

        this.editEducattion = this.page.locator("//button[@title='Edit Education']");

        this.SocialLinksEditBtn = this.page.locator("//div[text()='Social Links']/following::button[text()=' Edit'][1]");

        this.linkedinInput = this.page.locator("//div[@class='pfd-body']/descendant::input[1]");

        this.githubInput = this.page.locator("//div[@class='pfd-body']/descendant::input[2]");

        this.saveSocialLinksBtn = this.page.locator("//div[@class='pfd-footer']/child::button[2]");

        this.cancelSocialLinksBtn = this.page.locator("//div[@class='pfd-footer']/child::button[1]");

        this.assertLinkedinText = this.page.locator("//div[text()='LinkedIn']/following::a[1]");

        this.assertGithubText = this.page.locator("//div[text()='GitHub']/following::a[1]");

    }

    async signIn(email: string, password: string): Promise<void> {
        await this.learner_btn.click();

        await this.enterEmail.fill(email);

        await this.enterPassword.fill(password);

        await this.login_btn.click();
    }

    async openProfileManagement(): Promise<void> {
        await this.profile_sidebar_btn.click();
    }

    async clickAddSkill(): Promise<void> {
        await this.addSkill_btn.click();
    }

    async enterSkillName(skillName: string): Promise<void> {
        await this.skillName_input.fill(skillName);
        // Some dialog implementations enable their submit action on blur rather
        // than on the input event alone.
        await this.skillName_input.blur();
    }

    async enterSkillNameAndPressEnter(skillName: string): Promise<void> {
        await this.enterSkillName(skillName);
        await this.skillName_input.press("Enter");
    }

    async confirmAddSkill(): Promise<void> {
        await this.addskillConfirm_btn.waitFor({ state: "visible" });
        await this.addskillConfirm_btn.waitFor({ state: "attached" });
        await this.addskillConfirm_btn.click();
    }

    async cancelSkillDialog(): Promise<void> {
        await this.cancelskillConfirm_btn.click();
    }

    async deleteFirstSkill(): Promise<void> {
        await this.removeSkill_btn.first().click();
    }

    async confirmSkillDeletion(): Promise<void> {
        await this.Confirm_delete_btn.click();
    }

    async getSkillCount(): Promise<number> {
        return await this.removeSkill_btn.count();
    }

    async clickAddEducation(): Promise<void> {
        await this.Add_Education.click();
    }

    /** Clears every education field before data is entered into the dialog. */
    async clearEducationFields(): Promise<void> {
        await this.institution.clear();
        await this.degree.clear();
        await this.field_of_study.clear();
        await this.Yearrange.clear();
        await this.cgpa.clear();
    }

    async enterEducationDetails(education: LearnerEducation): Promise<void> {
        await this.clearEducationFields();
        await this.institution.fill(education.institution);
        await this.degree.fill(education.degree);
        await this.field_of_study.fill(education.Field_of_study);
        await this.Yearrange.fill(education.Year_range);
        await this.cgpa.fill(education.CGPA);
    }

    async confirmAddEducation(): Promise<void> {
        await this.addEducationBtn.click();
    }

    async editFirstEducation(): Promise<void> {
        await this.editEducattion.first().click();
    }

    /** The education form uses the same primary footer action for Save and Add. */
    async saveEducationDetails(): Promise<void> {
        await this.addEducationBtn.click();
    }

    async cancelEducationEdit(): Promise<void> {
        await this.cancelEducationBtn.click();
    }

    async getEducationDetailsFromForm(): Promise<LearnerEducation> {
        return {
            institution: await this.institution.inputValue(),
            degree: await this.degree.inputValue(),
            Field_of_study: await this.field_of_study.inputValue(),
            Year_range: await this.Yearrange.inputValue(),
            CGPA: await this.cgpa.inputValue()
        };
    }

    async areEducationDetailsVisible(education: LearnerEducation): Promise<boolean> {
        const values = [
            education.institution,
            education.degree,
            education.Field_of_study,
            education.Year_range,
            education.CGPA
        ];

        const visibility = await Promise.all(
            values.map(value => this.page.getByText(value, { exact: true }).last().isVisible())
        );

        return visibility.every(Boolean);
    }

    async clickSocialLinksEdit(): Promise<void> {
        await this.SocialLinksEditBtn.click();
    }

    async enterSocialLinks(socialLinks: SocialLinks): Promise<void> {
        await this.linkedinInput.fill(socialLinks.linkedin);
        await this.githubInput.fill(socialLinks.github);
    }

    async saveSocialLinks(): Promise<void> {
        await this.saveSocialLinksBtn.click();
    }

    async cancelSocialLinks(): Promise<void> {
        await this.cancelSocialLinksBtn.click();
    }

    async getDisplayedSocialLinks(): Promise<SocialLinks> {
        return {
            linkedin: (await this.assertLinkedinText.innerText()).trim(),
            github: (await this.assertGithubText.innerText()).trim()
        };
    }

    async getEducationCount(): Promise<number> {
        return await this.delEducationBtn.count();
    }

    async deleteFirstEducation(): Promise<void> {
        await this.delEducationBtn.first().click();
    }

    async confirmEducationDeletion(): Promise<void> {
        await this.DeleteEducationConfirmBtn.click();
    }
}
