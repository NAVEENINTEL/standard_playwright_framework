# Sauce Demo Automation

## Project Description
Sauce Demo Automation is a comprehensive end-to-end test automation project for the Sauce Demo application. The project utilizes Playwright + typescript to perform automated testing, ensuring the quality and reliability of the application across different scenarios.

## Application Overview
- **Name:** Sauce Demo
- **Purpose:** Sauce Demo is a sample web application used for demonstrating and testing various functionalities of an e-commerce platform. It provides a realistic scenario for users to practice and validate their test automation scripts.
- **Features:**
  - **User Authentication:** Users can log in using provided credentials to access the application.
  - **Product Listing:** Displays a list of products available for purchase, including product details and prices.
  - **Shopping Cart:** Allows users to add products to the cart and view the items before checkout.
  - **Checkout Process:** Users can complete the purchase by entering shipping information and finalizing the order.
  - **Order Confirmation:** Provides an order confirmation page after successful 

## Features
- **End-to-End Testing:** Comprehensive test coverage of the entire user journey.
- **Smoke Tests:** Quick validation of the most critical functionalities.
- **Regression Tests:** Ensure recent changes haven't introduced new issues.
- **Cross-Browser Testing:** Support for multiple browsers including Chrome, Firefox, and Safari.
- **Parallel Execution:** Efficient test execution with parallel processing.
- **Detailed Reports:** Generate and view detailed HTML test reports.
- **CI/CD Integration:** Seamless integration with GitHub Actions for automated testing.
- **Page Object Model (POM):** Abstraction layer for web pages, encapsulating elements and actions within classes.
- **Logging:** Implemented robust logging using Winston for better debugging and monitoring.
- **Data-Driven Testing:** Run the same test with multiple sets of input data to cover different scenarios.
- **Environment-Specific Configurations:** Manage configurations and sensitive data securely using environment variables.

## Installation
Follow these steps to set up the project on your local machine:

1. Clone the repository:
    download the zip file and open in vs code
   cd sauce-demo-automation
2. Install dependencies: 
    npm install


## Environment Variables
Create a .env file in the root directory to store environment variables:

# .env
Update credentials
BASE_URL=https://www.saucedemo.com
USERNAME=
PASSWORD=s

# Running Tests

## Run All Tests
npm run test

## Run Smoke Tests
npm run test:smoke

## Run Regression Tests
npm run test:regression

## Run Tests in Chrome
npm run test:chrome

## Run Tests in Firefox
npm run test:firefox

## Run Tests in Headed Mode
npm run test:headed

## Run Tests in Parallel 
npm run test:parallel


# Reports 
Using playwright inbuilt html reporting

## To generate and view the Playwright HTML report:
npm run report:html

# CI/CD/CT Integration

## The project is integrated with GitHub Actions to run smoke, regression, and E2E tests. The following workflows are defined in the .github/workflows/ directory:

1. Smoke Tests Workflow ( runs On every push and pull request to any branch. ) - > ( Validates the most critical functionalities to catch any obvious issues early. )

2. Regression Tests Workflow ( On push and pull request to the main branch, and on a nightly schedule. ) - > (Ensures that recent changes haven't introduced any new issues.)

3. E2E Tests Workflow (On push and pull request to the main branch, and on a nightly schedule.) - > (Validates the entire user journey and simulates real user scenarios.)


## Project Structure

### config/: 
Contains configuration files, including environment-specific configurations.

### pages/:
 Contains Page Object Model (POM) classes representing different pages of the application.

### tests/: 
Contains test scripts, including smoke tests, regression tests, and end-to-end tests.

### .github/workflows/: 
Contains GitHub Actions workflow files for CI/CD integration.
