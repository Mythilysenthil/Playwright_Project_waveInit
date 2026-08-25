@krishna
Feature: Profile Management Feature 24-06-2026_Krishnaprasath

Background:
    Given the user launches the application
    
  Scenario: Add a skill to the profile
     Given the user is on the profile management page
     When the user clicks the add skill button
     And enter the skill name 
     And clicks the Add skill button
     Then the skill should be added to the profile successfully
    
  Scenario: Delete a skill from the profile
     Given the user is on the profile management page
     When the user deletes the skill by clicking the delete button next to the skill
     And the user confirms the deletion
     Then the skill should be removed from the profile successfully  

  Scenario: User cancel the skill addition process
     Given the user is on the profile management page
     When the user clicks the add skill button
     And enter the skill name
     And clicks the cancel button
     Then the skill should not be added to the profile   

   Scenario: User cancel the skill deletion process
     Given the user is on the profile management page
     When the user deletes the skill by clicking the delete button next to the skill
     And clicks the cancel button
     Then the skill should not be removed from the profile   

   Scenario: User add skill by entering text in the skill input field and pressing the Enter key
     Given the user is on the profile management page
     When the user clicks the add skill button
     And enter the skill name by typing in the skill input field
     And clicks the Add skill button
     Then the skill should be added to the profile successfully  

   Scenario:  User add Education details to the profile
     Given the user is on the profile management page
     When the user clicks the add Education button
     And enter the Education details
     And clicks the Add Education button
     Then the Education details should be added to the profile successfully

   Scenario: User cancel the Education addition process
     Given the user is on the profile management page
     When the user clicks the add Education button
     And enter the Education details
     And clicks the cancel button
     Then the Education details should not be added to the profile

   Scenario: User click the Add Education button without entering any details
     Given the user is on the profile management page
     When the user clicks the add Education button
     And clicks the Add Education button without entering any details
     Then the user should see a validation message  

   Scenario: User delete Education details from the profile
     Given the user is on the profile management page
     When the user deletes the Education details by clicking the delete button next to the Education details
     And the user confirms the deletion
     Then the Education details should be removed from the profile successfully

   Scenario: User cancel the Education deletion process
     Given the user is on the profile management page
     When the user deletes the Education details by clicking the delete button next to the Education details
     And clicks the cancel button
     Then the Education details should not be removed from the profile    

