import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
When('the user enters valid credentials for learner login', async function (this:CustomWorld,dataTable) {
  // Write code here that turns the phrase above into concrete actions
   const credentials = dataTable.rowsHash();

        await this.ltp.enteremail(credentials.username);
        await this.ltp.enterPassword(credentials.password);
});
When('user enter the {string} of the course', async function (this:CustomWorld,string) {
  // Write code here that turns the phrase above into concrete actions
  await this.dp.clickMycourse();
  await this.mp.setSearchkeyword(string)
});

Then('only it shows related courses based on {string}', async function (this:CustomWorld,string) {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.mp.searchedCourses).toBeVisible();
  const courses: string[] = await this.mp.getCourses();
   for (const course of courses) {
            expect(course.toLowerCase()).toContain(string.toLowerCase());
        }
});

When('user enters an invalid keyword of the course', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.dp.clickMycourse();
  await this.mp.setSearchkeyword("string")
});

Then('no courses should be displayed', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  const courses: string[] = await this.mp.getCourses();
  await expect(courses.length).toBe(0) 
  await expect(this.mp.noCourseFound).toContainText("No courses found matching your criteria")
});
When('the user selects {string} from the sort dropdown', async function (this:CustomWorld,string) {
  // Write code here that turns the phrase above into concrete actions
  await this.dp.clickMycourse();
  await this.mp.sortByTitle(string);
});

Then('the courses should be displayed in ascending order by title', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
 const courses = await this.mp.getCourses();

        console.log("Courses displayed:", courses);

        // Create a copy and sort it in ascending order
        const sortedCourses = [...courses].sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: "base" })
        );

        console.log("Expected ascending order:", sortedCourses);

        // Compare actual vs expected
        expect(courses).toEqual(sortedCourses);
});

