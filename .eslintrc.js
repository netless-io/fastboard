/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  env: {
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  rules: {
    // TODO: wait for `import { type A }`
    // https://github.com/typescript-eslint/typescript-eslint/issues/3950
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "warn",
  },
};

// eslint-disable-next-line no-undef
module.exports = config;
