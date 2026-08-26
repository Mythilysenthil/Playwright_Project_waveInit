@Tamil
Feature: TamilKumar 25-08-2026 My course feature

    Background:
        Given the user launches the application
        And clicks the Learner Button
        When the user enters valid credentials
        And the user clicks the Sign in as Learner Button

    Scenario Outline: Valid search in my course
        When user enter the "<keyword>" of the course
        Then only it shows related courses based on "<keyword>"
        Examples:
            | keyword    |
            | React      |
            | Automation |

    Scenario: Invalid search in my course
        When user enters an invalid keyword of the course
        Then no courses should be displayed
    Scenario: Sort courses by title in My Course
        When the user selects "Sort by: Title" from the sort dropdown
        Then the courses should be displayed in ascending order by title