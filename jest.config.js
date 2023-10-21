const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const isCoverage = process.env.JEST_COVERAGE === "true";

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
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
  coverageReporters: isCoverage ? ["text", "lcov"] : undefined,
  coverageThreshold: isCoverage
    ? {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      }
    : undefined,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
module.exports = createJestConfig(customJestConfig);
