# Podcast App

Technical test - Capitole Consulting for Inditex client.

## Requirements

Make sure that we have installed the following requirements before to run the application:

- Node.js (v20.12.2 or higher).

## Configuration

- Clone the project to your local machine:
  ```
  git clone https://github.com/jstifano/podcast-app.git
  cd podcast-app
  ```
- Execute `npm install` to install all the project dependencies.

## App configuration in Development Mode

- Be inside podcast-app folder.

- Execute the script to generate the build in development mode with the command `npm run build:dev`

- Execute the script to lift the server in development mode with the command `npm run start:dev`

- It will open a new tab in the browser with the page in http://localhost:8080

## App configuration in Production Mode

- Be inside podcast-app folder.

- Execute the script to generate the build in production mode with the command  `npm run build:prod`

- Execute the script to generate the build in production mode with the command  `npm run start:prod`

- It will open a browser tab within the browser with the page in http://localhost:8080

## Unit Testing

- Execute `npm test` to run the unit tests made to the Podcast services, utility functions that are manipulated inside the project how as well some unit test with RTL and applying AAA architecture for the pages involved in the app.

Moreover, the tests will generate the testing coverage into the /coverage folder which can opened and verify the % that was covered, this can be found inside /coverage/lcov-report/index.html
