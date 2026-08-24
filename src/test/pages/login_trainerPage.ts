import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class loginTrainerpage extends BasePage {
    readonly page: Page;
    readonly trainertab: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly signinbutton: Locator;
    readonly dashboard: Locator;
    readonly errormsg: Locator;

    constructor(page: Page) {
        super(page);

        this.page = page;
        this.trainertab = page.locator("//div//button[@role='tab'][2]");
        this.email = page.locator("//input[@id='login-email']");
        this.password = page.locator("//input[@id='login-password']");
        this.signinbutton = page.locator("//button[@type='submit']");
        this.dashboard = page.locator("//h1[@class='tdb-header-title']");
        this.errormsg = page.locator("//div[text()='Invalid email or password']");
    }

    async Navigatepage() {
        await this.Navigate();
    }

    async clicktrainertab(){
        await this.Click(this.trainertab);
    }

    async enteremail(email: string) {
        await this.Fill(this.email, email);
    }

    async enterPassword(password: string) {
        await this.Fill(this.password, password);
    }

    async clickSigninButton() {
        await this.Click(this.signinbutton);
    }
}