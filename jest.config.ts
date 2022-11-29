import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageThreshold: {
    global: {
      branches: 100.0,
      functions: 100.0,
      lines: 100.0,
      statements: 100.0,
    },
  },
  coveragePathIgnorePatterns: [
    // "lib/**",
    // "src/**/*.spec.ts",
    "src/main.ts",
    // "jest.config.js",
  ],
};

export default config;
