# @Subathra @Participant
# Feature: Subathra_ Participant_Feature_25/08/2026_updated_01/09/2026_02/09/2026
#     Background:
#         Given the user launches the application
#         When the user clicks on the Admin Login
#         And the user enters the username and password
#         And the user clicks the Login button
#         And click the participant module
#     Scenario: Verify the admin can add the participant with valid details
#         When the admin can click the add participant button
#         When the user enters the participant details
#         And click auto generate password
#         And click add participant button
#         Then the admin can see participant added successfully
#     Scenario Outline: Admin cannot add participant without required details
#         When the admin clicks the add participant button
#         And the user enters the participant details "<Name>" "<Email>" "<Password>"
#         And click add participant button
#         Then the admin should see the validation message "<ExpectedMessage>"

#         Examples:
#             | Name  | Email                | Password  | ExpectedMessage             |
#             |       | participant@test.com | Test@1234 | Please fill out this field. |
#             | Tamil |                      | Test@1234 | Please fill out this field. |
#             | Tamil | participant@test.com |           | Please fill out this field. |

#     Scenario: Admin cannot add participant with already existing email
#         When the admin clicks the add participant button
#         And the user enters the participant details with an existing email
#         And click add participant button
#         Then the admin should see the email already exists message

#     Scenario: Verify admin can view all participants
#         Then all participants should be displayed

#     Scenario: Verify admin can view approved participants
#         When the admin clicks the Approved filter
#         Then only approved participants should be displayed

#     Scenario: Verify admin can view pending participants
#         When the admin clicks the Pending filter
#         Then only pending participants should be displayed

#     Scenario: Verify admin can view rejected participants
#         When the admin clicks the Rejected filter
#         Then only rejected participants should be displayed

#     Scenario: Verify admin can view participant profile
#         When the admin clicks the view participant profile button
#         Then the participant profile should be displayed

#     Scenario: Verify admin can view registered participant details
#         When the user selects a pending participant
#         And the user clicks the View button in Pending
#         Then the participant details should be displayed

#     Scenario: Verify admin can approve a registered participant
#         When the user selects a pending participant
#         And the user clicks the Approve button
#         Then the participant should be approved successfully

#     Scenario: Verify admin can reject a registered participant
#         When the user selects a pending participant
#         And the user clicks the Reject button
#         Then the participant should be rejected successfully

#     Scenario: Verify admin can delete a registered participant
#         When the user selects a pending participant
#         And the user clicks the Delete button
#         And the user confirms the deletion in pending 
#         Then the participant should be deleted successfully
#     Scenario: Verify admin can see the particpant page
#         Then admin can the participant title in particpant page