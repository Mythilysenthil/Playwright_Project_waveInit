@Mythily @trainer_module
Feature: Mythily_25/08/2026_trainer_module_management_functionality

  Description: This feature file is used to test the module management functionality available to the trainer for an assigned course.

  Background:
    Given the trainer is on the login page
    When the trainer enters valid credentials
    And the trainer clicks on the login button
    Then the trainer should be redirected to the dashboard page
    And the trainer navigates to the "My Trainings" page

  @viewassignedcourse
  Scenario: Verify that the trainer can view the course assigned by the admin

    Then the trainer should see the assigned course

  @opencourse
  Scenario: Verify that the trainer can open the assigned course

    When the trainer selects the assigned course
    Then the trainer should be redirected to the Course Editor page

  @addmodule
  Scenario: Verify that the trainer can add a new module to the assigned course

    When the trainer selects the assigned course
    And the trainer clicks on the "Add Module" button
    And the trainer enters a valid module name
    And the trainer saves the module
    Then the trainer should see the newly added module

  @emptymodule
  Scenario: Verify that the trainer cannot add a module without providing a module name

    When the trainer selects the assigned course
    And the trainer clicks on the "Add Module" button
    And the trainer leaves the module name empty
    And the trainer saves the module
    Then the trainer should see the module name validation message

  @editmodule
  Scenario: Verify that the trainer can edit an existing module

    When the trainer selects the assigned course
    And the trainer selects an existing module for editing
    And the trainer edits the module details
    And the trainer saves the changes
    Then the trainer should see the updated module details

  @deletemodule
  Scenario: Verify that the trainer can delete an existing module

    When the trainer selects the assigned course
    And the trainer selects an existing module for deletion
    And the trainer deletes the module
    And the trainer confirms the deletion
    Then the trainer should not see the deleted module