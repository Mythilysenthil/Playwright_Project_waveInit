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

  @createassessment
  Scenario: Verify that the trainer can create a draft coding assessment

    And the trainer clicks on the "Create Assessment" button
    Then the trainer should see the assessment created success message
    And the newly created coding assessment should be displayed with DRAFT status

  @editassessment
  Scenario: Verify that the trainer can edit a draft coding assessment

    When the trainer clicks on the "Create Assessment" button
    And the trainer clicks on the edit button of the draft coding assessment
    Then the coding assessment edit page should be displayed  