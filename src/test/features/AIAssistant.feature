@Jerishwin
Feature:Jerishwin Joseph 25-06-2026 AI Assistant feature
Background:
    Given the user launches the application
    And clicks the Learner Button
    And the user enters valid credentials
    And the user clicks the Sign in as Learner Button
    And the user should be direted to the home page

Scenario: AI Assistant open Profile
    When the user clicks the AI Assistant Button
    And the user liks the What should I do next Button
    And clik the complete my profile button
    Then the User should be direted to the profile page

Scenario: AI Assistant already on Profile
    Given the user is on the profile management page
    When the user clicks the AI Assistant Button
    And the user liks the What should I do next Button
    And clik the complete my profile button
    Then the User should see Already on profile page message



