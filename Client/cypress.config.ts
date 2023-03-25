import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "qs6hdq",
  e2e: {
    baseUrl: 'http://localhost:19000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
