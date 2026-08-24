Feature: TamilKumar 24-06-2026 Register feature
Background:
    Given the user launches the application
    And click the signup button
Scenario: Register with valid credentials
    When I enter valid registration details
    And I submit the registration form
    Then I should see a confirmation message indicating successful registration
