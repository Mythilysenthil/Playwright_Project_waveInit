@Mythily @trainer_coding_assessment
Feature: Mythily_26/08/2026_trainer_coding_assessment_functionality

  Description:
    This feature file is used to test the coding assessment functionality
    available to the trainer for an assigned course.

  Background:
    Given the trainer is on the login page
    When the trainer enters valid credentials
    And the trainer clicks on the login button
    Then the trainer should be redirected to the dashboard page
    And the trainer navigates to the "My Trainings" page
    Then the trainer should see the assigned course
    When the trainer selects the assigned course
    Then the trainer should be redirected to the Course Editor page
    When the trainer navigates to the Coding tab
    And the trainer clicks on the "Create Assessment" button

  @createassessment
  Scenario: Verify that the trainer can create a draft coding assessment

    Then the trainer should see the assessment created success message
    And the newly created coding assessment should be displayed with DRAFT status

  @editassessment
  Scenario: Verify that the trainer can edit a draft coding assessment

    And the trainer clicks on the edit button of the draft coding assessment
    And the trainer clicks on the Edit button in the assessment details
    Then the coding assessment edit page should be displayed

  @assessmentdetails
  Scenario: Verify that the trainer can enter coding assessment details

    And the trainer clicks on the edit button of the draft coding assessment
    And the trainer clicks on the Edit button in the assessment details
    Then the coding assessment edit page should be displayed
    When the trainer enters coding assessment details with title "<title>", time limit "<timeLimit>", and description "<description>"
    And the trainer saves the coding assessment
    Then the coding assessment title should be updated to "<title>"

    Examples:
      | title               | timeLimit | description                                                                  |
      | Reverse a String    |     30    | Write a program to reverse a given string without using a built-in function. |
      | Check Palindrome    |     25    | Write a program to check whether a given string is a palindrome.             |
      | Find Maximum Number |     30    | Write a program to find the largest number in an integer array.              |   

  @addproblems
  Scenario: Verify that the trainer can add coding problems to a draft assessment

    And the trainer clicks on the edit button of the draft coding assessment
    And the trainer clicks on the Edit button in the assessment details
    Then the coding assessment edit page should be displayed
    When the trainer clicks on the Problems tab
    And the trainer adds a valid coding problem to the assessment
    Then the selected coding problem should be added successfully

  @emptyproblem
  Scenario: Verify that the trainer cannot save a coding problem without mandatory details

    And the trainer clicks on the edit button of the draft coding assessment
    And the trainer clicks on the Edit button in the assessment details
    Then the coding assessment edit page should be displayed
    When the trainer clicks on the Problems tab
    And the trainer leaves the mandatory problem fields empty
    And the trainer saves the coding problem
    Then the validation messages should be displayed for the mandatory problem fields
    And the coding problem should not be added successfully

  @cancelassessment
  Scenario: Verify that the trainer can cancel editing a coding assessment

    And the trainer clicks on the edit button of the draft coding assessment
    And the trainer clicks on the Edit button in the assessment details
    Then the coding assessment edit page should be displayed
    When the trainer enters coding assessment details with title "<title>", time limit "<timeLimit>", and description "<description>"
    And the trainer clicks on the Cancel button
    Then the trainer should return to the Coding page

    Examples:
      | title               | timeLimit | description                                                                  |
      | Reverse a String    |     30    | Write a program to reverse a given string without using a built-in function. |