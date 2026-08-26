@Tamil @Discussion
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

    Scenario: Post the discussion with an empty question and without selecting a post type
        When Click my discussion
        And click Post
        Then user can see the required validation messages
    Scenario Outline: Delete the created discussion post
        When Click my discussion
        And select the created post by "<option>"
        And click Delete
        Then user can see the discussion post is deleted successfully
        Examples:
            | option |
            | Discussion |
            | Question |

