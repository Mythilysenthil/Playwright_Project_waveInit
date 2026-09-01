@Suabthra
Feature: Subathra 28-08-2026 Participant feature
    Background:
        Given the user launches the application
        When the user clicks on the Admin Login
        And the user enters the username and password
        And the user clicks the Login button
        And click the participant module
    Scenario: Verify the admin can add the participant with valid details
        When the admin can click the add participant button
        When the user enters the participant details
        And click auto generate password
        And click add participant button
        Then the admin can see participant added successfully
    Scenario Outline: Admin cannot add participant without required details
        When the admin clicks the add participant button
        And the user enters the participant details "<Name>" "<Email>" "<Password>"
        And click add participant button
        Then the admin should see the validation message "<ExpectedMessage>"

        Examples:
            | Name  | Email                | Password  | ExpectedMessage             |
            |       | participant@test.com | Test@1234 | Please fill out this field. |
            | Tamil |                      | Test@1234 | Please fill out this field. |
            | Tamil | participant@test.com |           | Please fill out this field. |
        
Scenario: Admin cannot add participant with already existing email
    When the admin clicks the add participant button
    And the user enters the participant details with an existing email
    And click add participant button
    Then the admin should see the email already exists message

