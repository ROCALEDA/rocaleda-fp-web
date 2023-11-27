import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://fp-web-service-mecna653na-uc.a.run.app/",
    //baseUrl: "http://localhost:3000/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    pageLoadTimeout: 15000,
    defaultCommandTimeout: 10000
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
