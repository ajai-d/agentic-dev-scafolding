const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/*.min.js"],
  },
  js.configs.recommended,
  {
    files: ["backend/src/**/*.js", "backend/test/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "caughtErrorsIgnorePattern": "^_" }],
    },
  },
  {
    files: ["frontend/src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": "off",
    },
  },
];
