const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000", // Set the base URL for your frontend
    specPattern: "cypress/e2e/**/*.cy.js", // Specify the pattern for test files
    supportFile: "cypress/support/e2e.js", // Path to the support file
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
