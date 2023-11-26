const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const isCoverage = process.env.JEST_COVERAGE === "true";

const customJestConfig = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/out/**",
    "!**/*.config.{js,ts}",
    "!**/api/**",
    "!**/cypress/**",
    "!**/coverage/**",
    "!**/app/**",
    "!**/pages/**",
    "!**/utils/**",
  ],
  coveragePathIgnorePatterns: ["./middleware.ts"],
  coverageReporters: isCoverage ? ["text", "lcov"] : undefined,
  coverageThreshold: isCoverage
    ? {
        global: {
          lines: 70,
        },
      }
    : undefined,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
module.exports = createJestConfig(customJestConfig);
