import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TrainerCoursePage extends BasePage {
  readonly participantButton: Locator;
  readonly inviteParticpantButton: Locator;
  readonly participantSearchBar: Locator;
  readonly allParticipants: Locator;
  readonly selectInvitedParticipant:Locator
  readonly particpantAddedSucessfully:Locator
  readonly particpantRefreshed:Locator
  readonly refreshButton:Locator
  constructor(page: Page) {
    super(page);
    this.particpantRefreshed=this.page.locator("//div[contains(text(),'Participant list refreshed')]")
    this.refreshButton=this.page.locator("//button[@title='Refresh']")
    this.particpantAddedSucessfully=this.page.locator("//div[contains(text(),'Participant added successfully')]")
    this.selectInvitedParticipant=this.page.locator("//span[normalize-space()='Invite Selected Participants']")
    this.allParticipants = this.page.locator(
      "//div/div[@style='font-size: 14px; font-weight: 600; color: rgb(15, 23, 42);']",
    );
    this.participantSearchBar = this.page.locator(
      "//input[@placeholder='Search approved participants...']",
    );
    this.inviteParticpantButton = this.page.locator(
      "//button[@title='Invite Approved Participants']//span[contains(text(),'Invite Participants')]",
    );
    this.participantButton = this.page.locator(
      "//span[normalize-space()='Participants']",
    );
  }
  async clickParticipant() {
    await this.Click(this.participantButton);
  }
  async clickInvitePartcipant() {
    await this.Click(this.inviteParticpantButton);
  }
  async setParticipant(trainer: string) {
    await this.TypeText(this.participantSearchBar, trainer);
  }
  async getAllParticipants() {
    try {
      return await this.GetAllTextContents(this.allParticipants);
    } catch (error) {
      return [];
    }
  }
  async clickParticipantforCourse(){
    await this.Click(this.allParticipants.first())
  }
  async clickSelectedParticipanted(){
    await this.Click(this.selectInvitedParticipant)
  }
  async clickRefresh(){
    await this.Click(this.refreshButton)
  }
}
