@Mythily @login_trainer
Feature: Mythily_24/08/2026_trainer_login_functionality
 Description: This feature file is used to test the login functionality of the application.

  Background: 
      Given the trainer is on the login page

@validlogin
Scenario: Verify that the trainer is able to login with valid credentials
    When the trainer enters valid credentials
    And the trainer clicks on the login button
    Then the trainer should be redirected to the dashboard page

@invalidpassword
Scenario: Verify that the trainer is unable to login with invalid password
    When the trainer enters invalid password credentials
    And the trainer clicks on the login button
    Then the trainer should see the error message "Invalid email or password"

@invalidusername
  Scenario: Verify that the trainer is unable to login with invalid username
    When the trainer enters invalid username credentials
    And the trainer clicks on the login button
    Then the trainer should see the error message "Invalid email or password"    