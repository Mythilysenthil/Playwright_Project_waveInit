@Tamil
Feature: TamilKumar 24-06-2026 Register feature
    Background:
        Given the user launches the application
        And click the signup button
    Scenario: Register with valid credentials
        When I enter valid registration details
        And I submit the registration form
        Then I should see a confirmation message indicating successful registration
    Scenario Outline: User cannot register with invalid credentials
        When the user enters the "<Name>", "<Email>", "<Phone>", "<Password>" and "<ConfirmPassword>"
        And the user clicks the Create Account button
        Then the user should can see the "<ExpectedMessage>"

        Examples:
            | Name  | Email           | Phone      | Password  | ConfirmPassword | ExpectedMessage             |
            |       | tamil@gmail.com | 9087654321 | Kiot@1234 | Kiot@1234       | Please fill out this field. |
            | Tamil | tamil           | 9087654321 |           | Kiot@1234       | Passwords do not match      |
            | Tamil | tamil           |            | Kiot@1234 | Kiot@1234       | Please fill out this field. |
            | Tamil | tamil@gmail.com | 9087654321 | Kiot@1234 | Wrong@1234      | Passwords do not match      |