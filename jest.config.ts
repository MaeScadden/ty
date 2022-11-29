import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  onlyChanged: true,
  coverageThreshold: {
    global: {
      branches: 100.0,
      functions: 100.0,
      lines: 100.0,
      statements: 100.0,
    },
  },
  bail: 1,
  testTimeout: 1000 * 10,
  coveragePathIgnorePatterns: [
    // "lib/**",
    // "src/**/*.spec.ts",
    "src/main.ts",
    // "jest.config.js",
  ],
};

export default config;
