@Subathra
Feature: Subathra_Admin_Login_Feature_24/08/2026_Updated_26/08/2026

    Background:
        Given the user launches the application
        When the user clicks on the Admin Login

    Scenario: User can login to the application with valid credentials
        When the user enters the username and password
        And the user clicks the Login button
        Then the user should see the Admin Portal

    Scenario Outline: User cannot login to the application with invalid credentials
        When the user enters the "<InvalidUsername>" and "<InvalidPassword>"
        And the user clicks the Login button
        Then the user should see the "<ExpectedMessage>"
        Examples:
            | InvalidUsername | InvalidPassword | ExpectedMessage             |
            | admin           | admin123        | Invalid email or password   |
            | admin@test.com  | admin           | Invalid email or password   |
            | admin@test.com  |                 | Please fill out this field. |
            |                 | admin123        | Please fill out this field. |

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
