import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
Given('the user launches the application', async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.bp.Navigate();
});
