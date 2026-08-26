import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MyCoursePage extends BasePage{
    readonly searchbar:Locator;
    readonly searchedCourses:Locator;
    readonly noCourseFound:Locator;
    readonly courseDropDown:Locator;
    readonly playwrightAutomationcourse:Locator;
    constructor(page:Page){
        super(page);
        this.searchbar=this.page.locator("//input[@placeholder='Search courses by title...']")
        this.searchedCourses=this.page.locator("//h3");
        this.noCourseFound=this.page.locator("//p[normalize-space()='No courses found matching your criteria']");
        this.courseDropDown=this.page.locator("//select[@class='tmt-select']");
        this.playwrightAutomationcourse=this.page.locator("//h3[normalize-space()='Playwright Automation']")
    }
    async setSearchkeyword(keyword:string){
        await this.TypeText(this.searchbar,keyword)
    }
    async getCourses(): Promise<string[]> {
    try {
        return await this.GetAllTextContents(this.searchedCourses);
    } catch (error) {
        return [];
    }
}
    async sortByTitle(sortOption:string){
        await this.SelectDropdown(this.courseDropDown,sortOption)
    }
    async clickPlaywrightAutomationCourse(){
        await this.Click(this.playwrightAutomationcourse)
    }

}