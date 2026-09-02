@Tamil
Feature: TamilKumar 01-09-2026 Trainer Course Feature

    Background:
        Given the trainer is on the login page
        When the trainer enters valid credentials
        And the trainer clicks on the login button
        And the trainer clicks My Training Module

    Scenario: Search for a valid participant in Invite Participant
        When the trainer clicks any course and clicks Invite Participant
        And the trainer enters a valid participant name
        Then only the matching participant should be displayed
    Scenario: Search for an invalid participant in Invite Participant
        When the trainer clicks any course and clicks Invite Participant
        And the trainer enters an invalid participant name
        Then no matching participant should be displayed
    Scenario: Invite an approved participant to the course
        When the trainer clicks any course and clicks Invite Participant
        And the trainer selects an approved participant
        And the trainer clicks Invite Selected Participants
        Then the participant should be added successfully
    Scenario: Cannot invite an invalid participant
        When the trainer clicks any course and clicks Invite Participant
        And the trainer enters an invalid participant name
        Then no matching participant should be displayed
        And the Invite Selected Participants button should not be enabled
    Scenario: Refresh the participant list
        When the trainer clicks any course and clicks Invite Participants
        And the trainer clicks the Refresh button
        Then the participant list should be refreshed successfully
