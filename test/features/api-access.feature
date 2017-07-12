Feature: Accessing the API
  As a SOS developer
  I want to get data from the mock API
  So that I can start work on my systems that consume the data

  Scenario: Accessing unprotected data
    Given I visit the unprotected API endpoint
    Then I will see a json array of application data

  Scenario: Testing the JWT security
    Given I visit the JWT test endpoint with the right secret and username
    Then I should see a success JSON message

  Scenario: Accessing the protected version of the data
    Given I visit the protected API endpoint with the right JWT secret and username
    Then I will see a json array of application data

  Scenario: Getting rejected from the protected version
    Given I visit the protected API endpoint with the wrong JWT secret and username
    Then I will get an unauthorized message
