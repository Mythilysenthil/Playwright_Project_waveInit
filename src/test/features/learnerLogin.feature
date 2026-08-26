@Jerishwin
Feature:Jerishwin Joseph 24-06-2026 Learners Login feature
Background:
    Given the user launches the application
    And clicks the Learner Button

Scenario: Log in as learner with valid credentials
    When the user enters valid credentials
    And the user clicks the Sign in as Learner Button
    Then the user should be direted to the home page

Scenario: Log in as learner with invalid email
    When the user enters invalid email and valid password
    And the user clicks the Sign in as Learner Button
    Then the user sees a pop up error message

Scenario: Log in as learner with invalid password
    When the user enters valid email and invalid password
    And the user clicks the Sign in as Learner Button
    Then the user sees a pop up error message

Scenario: Log in as learner with invalid redentials
    When the user enters invalid email and invalid password
    And the user clicks the Sign in as Learner Button
    Then the user sees a pop up error message

Scenario: Log in as learner without filling credentials
    When the user clicks the Sign in as Learner Button
    Then the user should see a error message

Scenario: Log in as learner without filling email
    When the user enters only the password
    And the user clicks the Sign in as Learner Button
    Then the user should see a error message

Scenario: Log in as learner without filling password
    When the user enters only the email
    And the user clicks the Sign in as Learner Button
    Then the user should see a error message


