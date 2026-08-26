# @Subathra
# Feature: Subathra_Admin_Login_Feature_25/08/2026

#     Background:
#         Given the user launches the application
#         When the user clicks on the Admin Login
#         And the user enters the username and password
#         And the user clicks the Login button
#         And the user clicks Training Programs in the Admin Panel

#     Scenario: Admin can create a valid training program
#         When the user clicks the Add Training button
#         And the user enters the training title
#         And the user enters the training description
#         And the user enters and selects the trainer name
#         And the user sets the start and end dates
#         And the user clicks the Create Training Session button
#         Then the user should see the training session created successfully

#     Scenario Outline: Admin cannot create training program with missing required fields
#         When the user clicks the Add Training button
#         And the user enters the training title "<Title>"
#         And the user enters the training description
#         And the user enters and selects the trainer name
#         And the user sets the start date "<StartDate>" and end date "<EndDate>"
#         And the user clicks the Create Training Session button
#         Then the user should see the validation message "<ExpectedMessage>"

#         Examples:
#             | Title               | StartDate        | EndDate          | ExpectedMessage             |
#             |                     | 2026-08-27T10:00 | 2026-08-30T17:00 | Please fill out this field. |
#             | Playwright Training |                  | 2026-08-30T17:00 | Please fill out this field. |
#             | Playwright Training | 2026-08-27T10:00 |                  | Please fill out this field. |
            
#     Scenario: Admin cannot create training program without trainer
#         When the user clicks the Add Training button
#         And the user enters the training title
#         And the user enters the training description
#         And the user sets the start and end dates
#         And the user clicks the Create Training Session button
#         Then the user should see the trainer validation message "Trainer ID or Trainer IDs is required"