import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TrainigProgramPage extends BasePage {
  readonly createTraining: Locator;
  readonly trainingTitle: Locator;
  readonly description: Locator;
  readonly assignTrainer: Locator;
  readonly selectTrainer: Locator;
  readonly startDateAndTime: Locator;
  readonly endDateAndTime: Locator;
  readonly createTrainingSession: Locator;
  readonly trainingCreated: Locator;
  readonly trainerRequired: Locator;
  readonly searchCourse: Locator;
  readonly courses: Locator;
  readonly noCourseFound: Locator;
  readonly viewDetails: Locator;
  readonly trainingDetails: Locator;
  readonly active: Locator;
  readonly upcoming: Locator;
  readonly completed: Locator;
  readonly status: Locator;
  readonly editButton:Locator;
  readonly saveButton:Locator;
  readonly trainingUpdated:Locator;
  readonly leaderBoardButton:Locator;
  readonly leaderBoard:Locator
  constructor(page: Page) {
    super(page);
    this.leaderBoardButton=this.page.locator("//button[@title='Leaderboard']").first();
    this.trainingUpdated=this.page.locator("//div[contains(text(),'Training updated successfully.')]");
    this.leaderBoard=this.page.locator("//h1[normalize-space()='Leaderboard']")
    this.createTraining = this.page.locator(
      "//button[@class='reg-admin-btn reg-admin-btn--primary']",
    );
    this.trainingTitle = this.page.locator(
      "//input[@placeholder='e.g. React Fundamentals']",
    );
    this.description = this.page.locator(
      "//textarea[@placeholder='Training objectives and content overview...']",
    );
    this.assignTrainer = this.page.locator(
      "//input[@placeholder='Search trainers by name or email...']",
    );
    this.saveButton=this.page.locator("//button[@type='submit']")
    this.selectTrainer = this.page
      .locator(
        "//span[@style='font-size: 12.5px; font-weight: 600; overflow-wrap: anywhere;']",
      )
      .first();
    this.startDateAndTime = this.page
      .locator("input[type='datetime-local']")
      .nth(0);
    this.endDateAndTime = this.page
      .locator("input[type='datetime-local']")
      .nth(1);
    this.createTrainingSession = this.page.locator("//button[@type='submit']");
    this.trainingCreated = this.page.locator(
      "//body/div[@id='root']/div[@class='fixed bottom-6 right-6 z-[999999] flex flex-col-reverse gap-2.5 pointer-events-none']/div[@class='pointer-events-auto']/div/div[1]",
    );
    this.trainerRequired = this.page.locator(
      "//div[contains(text(),'Trainer ID or Trainer IDs is required')]",
    );
    this.searchCourse = this.page.locator(
      "//input[@placeholder='Search by title or trainer...']",
    );
    this.courses = this.page.locator("//tr/td[1]");
    this.noCourseFound = this.page.locator(
      "//h3[normalize-space()='No Trainings Found']",
    );
    this.viewDetails = this.page
      .locator("//button[@title='View Details']")
      .first();
    this.trainingDetails = this.page.locator(
      "//h3[normalize-space()='Training Details']",
    );
    this.active = this.page.locator(
      "//button[@class='reg-admin-filter-tab reg-admin-filter-tab--active']",
    );
    this.upcoming = this.page.locator(
      "//div[@class='reg-admin-filters']//button[3]",
    );
    this.completed = this.page.locator(
      "//div[@class='reg-admin-filters']//button[4]",
    );
    this.status = this.page.locator("//tr/td[7]/span");
    this.editButton=this.page.locator("//button[@title='Edit Training']").first()
  }
  async clickAddCreateTraining() {
    await this.Click(this.createTraining);
  }
  async setTrainingTitle(title: string) {
    await this.TypeText(this.trainingTitle, title);
  }
  async setDescription(description: string) {
    await this.TypeText(this.description, description);
  }
  async setTrainerAndSelect(trainer: string) {
    await this.TypeText(this.assignTrainer, trainer);
    await this.Click(this.selectTrainer);
  }
  async setStartDateAndTime(dateTime: string): Promise<void> {
    await this.SetDateTime(this.startDateAndTime, dateTime);
  }

  async setEndDateAndTime(dateTime: string): Promise<void> {
    await this.SetDateTime(this.endDateAndTime, dateTime);
  }
  async clickCreateTraining() {
    await this.Click(this.createTrainingSession);
  }
  async setCourse(course: string) {
    await this.TypeText(this.searchCourse, course);
  }
  async getAllCourses() {
    await this.courses.first().waitFor({ state: "visible" });
    return await this.GetAllTextContents(this.courses);
  }
  async clickViewdetails() {
    await this.Click(this.viewDetails);
  }
  async clickActive() {
    await this.Click(this.active);
  }

  async clickUpcoming() {
    await this.Click(this.upcoming);
  }

  async clickCompleted() {
    await this.Click(this.completed);
  }
  async getAllStatuses() {
    await this.status.first().waitFor({state:"visible"})
    return await this.GetAllTextContents(this.status);
  }
  async clickEdit(){
    await this.Click(this.editButton)
  }
  async clickSaveButton(){
    await this.Click(this.saveButton)
  }
  async clickLeaderBoard(){
    await this.Click(this.leaderBoardButton)
  }
}
