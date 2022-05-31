module.exports = {
  roots: ["unit-tests"],
  testMatch: ["**/tests/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|stsx)$": "ts-jest",
  },
};
