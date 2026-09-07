@Tamil @interview
Feature: TamilKumar 02-09-2026 Interview Details Management

    Background:
        Given the user launches the application
        When the user clicks on the Admin Login
        And the user enters the username and password
        And the user clicks the Login button

    @ViewInterviewDetails
    Scenario: Verify user can view interview details
        When the user navigates to the Interview module
        And the user clicks the View button
        Then the interview details should be displayed

    @EditInterviewDetails
    Scenario: Verify user can edit interview details
        When the user navigates to the Interview module
        And the user clicks the Edit button in interview
        And the user clicks the Save button
        Then the interview details should be updated successfully

    @CancelEdit
    Scenario: Verify user can cancel editing interview details
        When the user navigates to the Interview module
        And the user clicks the Edit button in interview
        And the user clicks the Cancel button
        Then the changes should not be saved
    Scenario: Verify user can see the interview page
        When the user navigates to the Interview module
        Then the user can see interview title

        @AllInterviews
    Scenario: Verify user can view all interviews
        When the user navigates to the Interview module
        When the user clicks the All filter
        Then the interview list should be displayed

    @ScheduledInterviews
    Scenario: Verify user can view scheduled interviews
        When the user navigates to the Interview module
        When the user clicks the Scheduled filter
        And the user clicks the Change Status button of the first interview
        Then the interview status should be Scheduled

    @InProgressInterviews
    Scenario: Verify user can view in progress interviews
        When the user navigates to the Interview module
        When the user clicks the In Progress filter
        And the user clicks the Change Status button of the first interview
        Then the interview status should be In Progress

    @CompletedInterviews
    Scenario: Verify user can view completed interviews
        When the user navigates to the Interview module
        When the user clicks the Completed filter
        And the user clicks the Change Status button of the first interview
        Then the interview status should be Completed

    @CancelledInterviews
    Scenario: Verify user can view cancelled interviews
        When the user navigates to the Interview module
        When the user clicks the Cancelled filter
        And the user clicks the Change Status button of the first interview
        Then the interview status should be Cancelled