
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ParticipantPage extends BasePage {
  readonly addParticipantPlusButton: Locator;
  readonly name: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly autoGenarate: Locator;
  readonly addParticipant: Locator;
  readonly participantCreated: Locator;
  readonly accountAlreadyExist: Locator;
  readonly particpantTitle:Locator;

  readonly approvedFilter: Locator;
  readonly pendingFilter: Locator;
  readonly rejectedFilter: Locator;
  readonly participantStatus: Locator;

  readonly exportButton: Locator;
  readonly viewParticipantProfile: Locator;
  readonly participantProfileTitle: Locator;
  readonly fileDownloaded: Locator;

  readonly approveParticipant: Locator;
  readonly rejectParticipant: Locator;
  readonly deleteParticipant: Locator;

  readonly participantApproved: Locator;
  readonly participantRejected: Locator;
  readonly participantRemoved: Locator;

  readonly confirmDelete: Locator;

  constructor(page: Page) {
    super(page);
    this.particpantTitle=this.page.locator("//h2[@class='reg-admin-title']")
    this.exportButton = this.page.locator(
      "//button[@title='Export CSV']",
    );

    this.fileDownloaded = this.page.locator(
      "//div[contains(text(),'Exported participants CSV')]",
    );

    this.accountAlreadyExist = this.page.locator(
      "//span[normalize-space()='An account with this email already exists.']",
    );

    this.addParticipantPlusButton = this.page.locator(
      "//button[@class='reg-admin-btn reg-admin-btn--primary']",
    );

    this.name = this.page.locator(
      "//input[@placeholder='e.g. Rahul Sharma']",
    );

    this.email = this.page.locator(
      "//input[@placeholder='e.g. rahul@example.com']",
    );

    this.password = this.page.locator(
      "//input[@placeholder='Enter password (min 6 chars)']",
    );

    this.autoGenarate = this.page.locator(
      "//button[normalize-space()='Auto-Generate']",
    );

    this.addParticipant = this.page.locator(
      "//span[normalize-space()='Add Participant']",
    );

    this.participantCreated = this.page.locator(
      "//div[normalize-space()='Participant Added']",
    );

    this.approvedFilter = this.page.locator(
      "//div[@class='reg-admin-filters']//button[2]",
    );

    this.pendingFilter = this.page.locator(
      "//div[@class='reg-admin-filters']//button[3]",
    );

    this.rejectedFilter = this.page.locator(
      "//div[@class='reg-admin-filters']//button[4]",
    );

    this.participantStatus = this.page.locator(
      "//tr/td[3]",
    );

    this.viewParticipantProfile = this.page.locator(
      "//button[@title='View participant profile']",
    );

    this.participantProfileTitle = this.page.locator(
      "//h3[@class='tpm-title']",
    );

    this.approveParticipant = this.page.locator(
      "//button[@title='Approve participant']",
    );

    this.rejectParticipant = this.page.locator(
      "//button[@title='Reject participant']",
    );

    this.deleteParticipant = this.page.locator(
      "//button[@title='Delete participant']",
    );

    this.participantApproved = this.page.locator(
      "//div[normalize-space()='Participant approved successfully']",
    );

    this.participantRejected = this.page.locator(
      "//div[contains(text(),'Participant rejected successfully')]",
    );

    this.confirmDelete = this.page.locator(
      "//button[@class='reg-admin-btn reg-admin-btn--danger']",
    );

    this.participantRemoved = this.page.locator(
      "//div[contains(text(),'Participant removed successfully')]",
    );
  }

  async clickAddParticpantPlus() {
    await this.Click(this.addParticipantPlusButton);
  }

  async setName(name: string) {
    await this.TypeText(this.name, name);
  }

  async setEmail(email: string) {
    await this.TypeText(
      this.email,
      email + Date.now() + "@gamil.com",
    );
  }

  async setAlreadyExistEmail(email: string) {
    await this.TypeText(this.email, email);
  }

  async setPassword(password: string) {
    await this.TypeText(this.password, password);
  }

  async clickAutoGenerate() {
    await this.Click(this.autoGenarate);
  }

  async clickAddParticipant() {
    await this.Click(this.addParticipant);
  }

  async clickExportButton() {
    await this.Click(this.exportButton);
  }

  async getNameValidationMessage() {
    return await this.name.evaluate(
      (element) => (element as HTMLInputElement).validationMessage,
    );
  }

  async getEmailValidationMessage() {
    return await this.email.evaluate(
      (element) => (element as HTMLInputElement).validationMessage,
    );
  }

  async getPasswordValidationMessage() {
    return await this.password.evaluate(
      (element) => (element as HTMLInputElement).validationMessage,
    );
  }

  async clickApprovedFilter() {
    await this.Click(this.approvedFilter);
  }

  async clickPendingFilter() {
    await this.Click(this.pendingFilter);
  }

  async clickRejectedFilter() {
    await this.Click(this.rejectedFilter);
  }

  async getParticipantStatuses(): Promise<string[]> {
    await this.participantStatus.first().waitFor({
      state: "visible",
    });

    return await this.GetAllTextContents(
      this.participantStatus,
    );
  }

  async clickViewParticipantProfile() {
    await this.viewParticipantProfile.first().click();
  }

  async getParticipantProfileTitle(): Promise<string> {
    await this.participantProfileTitle.waitFor({
      state: "visible",
    });

    return (await this.participantProfileTitle.textContent()) ?? "";
  }

  async clickApproveParticipant() {
    await this.approveParticipant.first().click();
  }

  async verifyParticipantApproved() {
    await this.participantApproved.waitFor({
      state: "visible",
    });
  }

  async clickRejectParticipant() {
    await this.rejectParticipant.first().click();
  }

  async verifyParticipantRejected() {
    await this.participantRejected.waitFor({
      state: "visible",
    });
  }

  async clickDeleteParticipant() {
    await this.deleteParticipant.first().click();
  }

  async clickConfirmDelete() {
    await this.confirmDelete.first().click();
  }

  async verifyParticipantRemoved() {
    await this.participantRemoved.waitFor({
      state: "visible",
    });
  }
}
