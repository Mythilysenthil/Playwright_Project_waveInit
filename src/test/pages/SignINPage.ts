import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignINPage extends BasePage {
    readonly signUpButton:Locator;
    readonly adminButton:Locator;
    readonly adminUsername:Locator;
    readonly adminPassowrd:Locator;
    readonly signButton:Locator;
    readonly invalidEmailOrPassword:Locator
    constructor(public page: Page) {
        super(page);
        this.signUpButton =this.page.locator("//a[@class='auth-footer-link']");
        this.adminButton=this.page.locator("//span[normalize-space()='Admin']");
        this.adminUsername=this.page.locator("//input[@id='login-email']");
        this.adminPassowrd=this.page.locator("//input[@id='login-password']");
        this.signButton=this.page.locator("//span[normalize-space()='Sign in as Admin']");
        this.invalidEmailOrPassword=this.page.locator("//div[contains(text(),'Invalid email or password')]");
    }
    async clickSignUpButton() {
        await this.signUpButton.click();
    }
    async clickAdminButton(){
        await this.Click(this.adminButton);
    }
    async setUsername(username:string){
        await this.TypeText(this.adminUsername,username)
    }
    async setPassword(password:string){
        await this.TypeText(this.adminPassowrd,password)
    }
    async clickSignButton(){
        await this.Click(this.signButton);
    }
}