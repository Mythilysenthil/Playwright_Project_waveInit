import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CoursePage extends BasePage{
    readonly DiscussionButton:Locator;
    readonly discussionDropDown:Locator;
    readonly questionInput:Locator;
    readonly createPost:Locator;
    readonly postCreated:Locator
    readonly deleteQuestion:Locator;
    readonly discussionOption:Locator;
    readonly questionoption:Locator;
    readonly deletePostButton:Locator
    readonly postDeleted:Locator;
    constructor(page:Page){
        super(page);
        this.DiscussionButton=this.page.locator("//span[normalize-space()='Discussions']")
        this.discussionDropDown=this.page.locator("//select[@class='cdb-select']")
        this.questionInput=this.page.locator("//textarea")
        this.createPost=this.page.locator("//button[@type='submit']")
        this.postCreated=this.page.locator("//div[contains(text(),'Post created successfully!')]");
        this.deleteQuestion=this.page.locator("//button[@title='Delete Post']").first();
        this.discussionOption=this.page.locator("//button[contains(@class,'cdb-filter-pill')]//span[contains(text(),'Discussions')]")
        this.questionoption=this.page.locator("//span[normalize-space()='Q&A']")
        this.deletePostButton=this.page.locator("//button[@class='wam-btn wam-btn-confirm wam-btn-confirm--danger']")
        this.postDeleted=this.page.locator("//div[contains(text(),'Post deleted successfully.')]")
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
    async deletePost(){
        await this.Click(this.deleteQuestion)
        await this.Click(this.deletePostButton)
    }
    async clickDiscussionOption(){
        await this.Click(this.discussionOption);
    }
    async clickQuestionoption(){
        await this.Click(this.questionoption)
    }
}