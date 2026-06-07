module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  testMatch: ["**/__tests__/**/*.test.js"],
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "controllers/**/*.js",
    "middleware/authenticateToken.js",
    "!**/__tests__/**",
  ],
  coverageThreshold: {
    global: {
      lines: 60,
      functions: 60,
      branches: 50,
    },
  },
};
