import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CoursePage extends BasePage{
    readonly DiscussionButton:Locator;
    readonly discussionDropDown:Locator;
    readonly questionInput:Locator;
    readonly createPost:Locator;
    readonly postCreated:Locator
    constructor(page:Page){
        super(page);
        this.DiscussionButton=this.page.locator("//span[normalize-space()='Discussions']")
        this.discussionDropDown=this.page.locator("//select[@class='cdb-select']")
        this.questionInput=this.page.locator("//textarea")
        this.createPost=this.page.locator("//button[@type='submit']")
        this.postCreated=this.page.locator("//div[contains(text(),'Post created successfully!')]")
    }
    async clickDiscussion(){
        await this.Click(this.DiscussionButton)
    }
    async selectDiscussionType(option:string){
        await this.SelectDropdown(this.discussionDropDown,option)
    }
    async setDiscussion(discussion:string){
        await this.TypeText(this.questionInput,discussion)
    }
    async clickCreatePost(){
        await this.Click(this.createPost)
    }
}