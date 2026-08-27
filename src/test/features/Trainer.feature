@Tamil
Feature: TamilKumar 27-08-2026 Trainer feature
    Background:
        Given the user launches the application
        When the user clicks on the Admin Login
        And the user enters the username and password
        And the user clicks the Login button
        And click trainer module
    Scenario: Add trainer with valid credentials
        When the user clicks the Add Trainer button
        And the user enters valid trainer account details
        And the user clicks the Create Trainer button
        Then the trainer account should be created successfully


    Scenario Outline: Add trainer without required details
        When the user clicks the Add Trainer button
        And the user enters the following trainer details:
            | Full Name  | Email   | Mobile     | Password   | Confirm Password  |
            | <FullName> | <Email> | 9876543210 | <Password> | <ConfirmPassword> |
        And the user clicks the Create Trainer button
        Then the user should see the validation message "<Message>"

        Examples:
            | FullName | Email     | Password  | ConfirmPassword | Message                     |
            |          | trainer01 | Test@1234 | Test@1234       | Full name is required       |
            | Tamil    |           | Test@1234 | Test@1234       | Enter a valid email address |
            | Tamil    | trainer02 |           | Test@1234       | Password is required        |
            | Tamil    | trainer02 | Test@1234 |                 | Password is required        |