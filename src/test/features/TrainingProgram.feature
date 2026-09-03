@Subathra
Feature: Subathra_Admin_Login_Feature_25/08/2026

    Background:
        Given the user launches the application
        When the user clicks on the Admin Login
        And the user enters the username and password
        And the user clicks the Login button
        And the user clicks Training Programs in the Admin Panel

    Scenario: Admin can create a valid training program
        When the user clicks the Add Training button
        And the user enters the training title
        And the user enters the training description
        And the user enters and selects the trainer name
        And the user sets the start and end dates
        And the user clicks the Create Training Session button
        Then the user should see the training session created successfully

    Scenario Outline: Admin cannot create training program with missing required fields
        When the user clicks the Add Training button
        And the user enters the training title "<Title>"
        And the user enters the training description
        And the user enters and selects the trainer name
        And the user sets the start date "<StartDate>" and end date "<EndDate>"
        And the user clicks the Create Training Session button
        Then the user should see the validation message "<ExpectedMessage>"

        Examples:
            | Title               | StartDate        | EndDate          | ExpectedMessage             |
            |                     | 2026-08-27T10:00 | 2026-08-30T17:00 | Please fill out this field. |
            | Playwright Training |                  | 2026-08-30T17:00 | Please fill out this field. |
            | Playwright Training | 2026-08-27T10:00 |                  | Please fill out this field. |

    Scenario: Admin cannot create training program without trainer
        When the user clicks the Add Training button
        And the user enters the training title
        And the user enters the training description
        And the user sets the start and end dates
        And the user clicks the Create Training Session button
        Then the user should see the trainer validation message "Trainer ID or Trainer IDs is required"
    
    Scenario: Search the course by valid title
        When The user enters the valid search title
        Then Only valid courses should be shown
    
    Scenario: Search the course by trainer
        When The user enters the valid trainer name
        Then Only courses associated with the trainer should be shown
   
    Scenario: Search the course by invalid title
        When The user enters an invalid search title
        Then No courses should be shown

    Scenario: Search the course by invalid trainer
        When The user enters an invalid trainer name
        Then No courses should be shown

    Scenario: View details of the course
        When The user enters the valid search title
        And click view details of the searched course
        Then show details of the course

    Scenario Outline: Admin can filter training programs by status
        When the user clicks the "<Status>" training filter
        Then only "<Status>" training programs should be displayed

        Examples:
            | Status    |
            | Active    |
            | Upcoming  |
            | Completed |
            
    Scenario Outline: Admin can edit training program details
        And the user clicks the edit training button
        And the user clicks the Update Training Session button
        Then the user should see the training session updated successfully

    Scenario Outline: Admin can view training program leaderboard
        And the user clicks the leaderboard button
        Then the user should see the training leaderboard

    Scenario: Verify admin can view an approved participant
        When the admin clicks the Approved filter
        And the admin clicks the View button for an approved participant
        Then the approved participant details should be displayed

    Scenario: Verify admin can view a rejected participant
        When the admin clicks the Rejected filter
        And the admin clicks the View button for a rejected participant
        Then the rejected participant details should be displayed

    Scenario: Verify admin can delete a rejected participant
        When the admin clicks the Rejected filter
        And the admin clicks the Delete button for a rejected participant
        And the admin confirms the deletion
        Then the rejected participant should be deleted successfully

    Scenario: Verify admin can bulk delete rejected participants
        When the admin clicks the Rejected filter
        And the user selects multiple rejected participants
        And the user clicks the bulk Delete button
        And the user confirms the bulk deletion
        Then the selected rejected participants should be deleted successfully

    Scenario: Verify bulk Delete button is disabled when no rejected participant is selected
        When the admin clicks the Rejected filter
        And the user does not select any rejected participant
        Then the bulk Delete button should be disabled
