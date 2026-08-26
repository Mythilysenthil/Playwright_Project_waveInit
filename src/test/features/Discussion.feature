@Tamil
Feature: Discussion Feature

    Background:
        Given the user launches the application
        And clicks the Learner Button
        When the user enters valid credentials
        And the user clicks the Sign in as Learner Button
        And click My courses
        And click any course

    Scenario Outline: Post the valid discussion in the course
        When Click my discussion
        And select the "<option>" of post
        And enter the discussion question
        And click Post
        Then user can see post is created

        Examples:
            | option      |
            | Normal Post |
            | Question    |
