import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { TIMEOUTS } from "../constants/timeouts";

export class TrainerCodeAssessmentpage extends BasePage {
    readonly page: Page;
    readonly coding: Locator;
    readonly createAssessment: Locator;
    readonly assCreationMsg: Locator;
    readonly draftAss: Locator;
    readonly editbtn: Locator;
    readonly editPageTxt: Locator;
    readonly edittab: Locator;
    readonly assessmentTitle: Locator;
    readonly timeLimit: Locator;
    readonly description: Locator;
    readonly savebtn: Locator;

    readonly problembtn: Locator;
    readonly addProblem : Locator;
    readonly title : Locator;
    readonly descrip : Locator;
    readonly diff : Locator;
    readonly marks : Locator;
    readonly memory : Locator;
    readonly constrain : Locator;
    readonly input : Locator;
    readonly output : Locator;
    readonly explanation : Locator;
    readonly problemSavebtn : Locator;
    readonly addedProblem: Locator;

    readonly cancelbtn: Locator;

    constructor(page: Page) {
        super(page);

        this.page = page;
        this.coding = page.locator("//div[@class='wl-detail-tabs-list']/button[4]");
        this.createAssessment = page.locator( "//div[@class='cct-actions']/button[@class='cct-btn-primary']");
        this.assCreationMsg = page.locator("//div[text()='Assessment created (DRAFT)']");
        this.draftAss = page.locator("//tbody/tr/td[4]/span").first();
        this.editbtn = page.locator("//button[@title='Edit Assessment']").first();
        this.editPageTxt = page.locator("//div/h1[contains(text(),'Untitled Coding Assessment')]");
        this.edittab = page.getByRole('button', {name: 'Edit',exact: true});
        this.assessmentTitle = page.locator("//div/input").first();
        this.timeLimit = page.locator("//div/input[@type='number']");
        this.description = page.locator("//div/textarea[@rows='3']");
        this.savebtn = page.getByRole('button', { name: 'Save Changes' });
        this.cancelbtn = page.getByRole('button', { name: 'Cancel Edit'});

        this.problembtn = page.locator("//button/span[contains(text(), 'Problems')]");
        this.addProblem = page.locator("//button[contains(text(), ' Add Problem')]");
        this.title = page.locator("//label[contains(text(), 'Title *')]/following-sibling::input");
        this.descrip = page.locator("//label[contains(text(), 'Description *')]/following-sibling::textarea");
        this.diff = page.locator("//label[contains(normalize-space(),'Difficulty')]/following-sibling::select");
        this.marks = page.locator("//label[contains(text(), 'Marks')]/following-sibling::input");
        this.memory = page.locator("(//input[@type='number'])[2]");
        this.constrain = page.locator("//label[contains(text(), 'Problem Constraints (Time/Memory/Bounds)')]/following-sibling::textarea");
        this.input = page.locator("//label[contains(text(), 'Input Format')]/following-sibling::textarea");
        this.output = page.locator("//label[contains(text(), 'Output Format')]/following-sibling::textarea");
        this.explanation = page.locator("//label[contains(text(), 'Explanation (optional)')]/following-sibling::textarea");
        this.problemSavebtn = page.getByRole('button', {name:'Save Problem'});
        this.addedProblem = page.locator("//div[contains(text(), 'Reverse a String')]");
    }   

    async clickCoding() {
        await this.Click(this.coding);
    }

    async clickCreateAssessment(): Promise<void> {
        console.log("PAGE OBJECT: Starting Create Assessment");

        await this.createAssessment.waitFor({
            state: "visible",
            timeout: TIMEOUTS.PAGE_LOAD
        });

        await expect(this.createAssessment).toBeEnabled({
            timeout: TIMEOUTS.ASSERTION
        });
        await this.Click(this.createAssessment);
        console.log("PAGE OBJECT: Create Assessment clicked");
    }

    async getSuccessMsg(): Promise<string> {
        await this.assCreationMsg.waitFor({
            state: "visible",
            timeout: TIMEOUTS.ASSERTION
        });
        return await this.GetText(this.assCreationMsg);
    }

    async isVisibleDraft(): Promise<boolean> {
        return await this.IsVisible(this.draftAss);
    }

    async clickEditBtn(): Promise<void> {

        console.log("PAGE OBJECT: Clicking Edit Assessment");
        await this.editbtn.waitFor({state: "visible",timeout: TIMEOUTS.PAGE_LOAD});
        await expect(this.editbtn).toBeEnabled({timeout: TIMEOUTS.ASSERTION});

        console.log("PAGE OBJECT: Edit Assessment count =",await this.editbtn.count());
        console.log("PAGE OBJECT: Edit Assessment visible =",await this.editbtn.isVisible());

        await this.editbtn.evaluate((button: HTMLElement) => {button.click();});
        console.log("PAGE OBJECT: URL after clicking Edit Assessment =",this.page.url());
    }

    async isVisibleEditPage(): Promise<boolean> {
        console.log("PAGE OBJECT: Checking Edit Assessment page");
        console.log("Assessment title input count =",await this.assessmentTitle.count());

        return await this.IsVisible(this.assessmentTitle);
    }

    async clickEditTab(){
        console.log("PAGE OBJECT: Clicking Edit button in assessment details");
        await this.edittab.waitFor({state: "visible",timeout: TIMEOUTS.PAGE_LOAD});

        await expect(this.edittab).toBeEnabled({timeout: TIMEOUTS.ASSERTION});

        console.log("PAGE OBJECT: Edit button count =", await this.edittab.count());

        await this.Click(this.edittab);

        console.log("PAGE OBJECT: Edit button clicked");
    }

    async enterAssessmentDetails(title: string,timeLimit: string,description: string){
        await this.Fill(this.assessmentTitle, title);
        await this.Fill(this.timeLimit, timeLimit);
        await this.Fill(this.description, description);
    }

    async clickSavebtn(){
        const [response] = await Promise.all([
            this.page.waitForResponse(resp => resp.url().includes('/assessment') && resp.status() === 200, { timeout: TIMEOUTS.PAGE_LOAD }).catch(() => null),
            this.Click(this.savebtn),
        ]);
    // fallback: wait for old modal/edit form to disappear
        await this.assessmentTitle.first().waitFor({ state: "hidden", timeout: TIMEOUTS.ASSERTION }).catch(() => {});
    }

    getAssessmentTitle(title: string): Locator { 
        return this.page.locator( `//div/h1[contains(normalize-space(),'${title}')]` ); 
    } 
        
    async isAssessmentTitleVisible( title: string ): Promise<boolean> {
        const titleLocator = this.getAssessmentTitle(title);
        try {
            await titleLocator.waitFor({ state: "visible", timeout: TIMEOUTS.ASSERTION });
            return true;
        } catch {
            return false;
        }
    }

    async clickProblemBtn(){
        await this.problembtn.waitFor({ state: "visible", timeout: TIMEOUTS.PAGE_LOAD }); 
        await this.Click(this.problembtn);

        await this.addProblem.waitFor({ state: "visible", timeout: TIMEOUTS.ASSERTION });
        await this.Click(this.addProblem);
    }

async addValidCodingProblem(problem: any): Promise<void> {

    console.log("PAGE OBJECT: Filling coding problem");
    console.log("Problem Title:", problem.title);

    await this.title.waitFor({
        state: "visible",
        timeout: TIMEOUTS.ASSERTION
    });

    await this.Fill(this.title, problem.title);

    await this.Fill(
        this.descrip,
        problem.description
    );

    await this.diff.selectOption({
        label: problem.difficulty
    });

    await this.Fill(
        this.marks,
        problem.marks.toString()
    );

    const memoryValue = problem.memoryLimit
        .replace(/\s*MB/i, "")
        .trim();

    await this.Fill(
        this.memory,
        memoryValue
    );

    await this.Fill(
        this.constrain,
        problem.constraints
    );

    await this.Fill(
        this.input,
        problem.input
    );

    await this.Fill(
        this.output,
        problem.output
    );

    await this.Fill(
        this.explanation,
        problem.explanation
    );

    console.log("PAGE OBJECT: Problem details filled");

    await expect(this.problemSavebtn).toBeEnabled({
        timeout: TIMEOUTS.ASSERTION
    });

    await this.Click(this.problemSavebtn);

    console.log(
        `PAGE OBJECT: Problem '${problem.title}' saved successfully`
    );
}

async isProblemAdded(): Promise<boolean> { 
    await expect(this.addedProblem).toBeVisible({ timeout: TIMEOUTS.ASSERTION }); 
    return true; 
}


    async clearMandatoryProblemFields(): Promise<void> {
        console.log("PAGE OBJECT: Clearing mandatory problem fields");

        await this.title.fill("");
        await this.descrip.fill("");
 
        console.log("PAGE OBJECT: Title and Description cleared");
    }

    async clickProblemSave(): Promise<void> {
        console.log("PAGE OBJECT: Clicking Save Problem");

        await expect(this.problemSavebtn).toBeEnabled({timeout: TIMEOUTS.ASSERTION});
        await this.Click(this.problemSavebtn);

        console.log("PAGE OBJECT: Save Problem clicked");
    }

    async getProblemValidationMessages(): Promise<string[]> {
        const messages: string[] = [];
        const titleMessage = await this.title.evaluate(element => (element as HTMLInputElement).validationMessage);

        const descriptionMessage = await this.descrip.evaluate(element => (element as HTMLTextAreaElement).validationMessage);

        if (titleMessage) {
            messages.push(titleMessage);
        }
        if (descriptionMessage) {
            messages.push(descriptionMessage);
        }
        console.log("PAGE OBJECT: Problem validation messages =",messages);
        return messages;
    }

    async isAddProblemModalVisible(): Promise<boolean> {
        const addProblemHeading = this.page.getByRole("heading",
        { name: "Add Problem", exact: true }
    );
    return await addProblemHeading.isVisible().catch(() => false);
    }
    
    //cancel edit

    async clickCancelbtn(){
        await this.Click(this.cancelbtn);
    }
}