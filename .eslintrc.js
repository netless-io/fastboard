/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  env: {
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks", "html", "import"],
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    // TODO: wait for `import { type A }`
    // https://github.com/typescript-eslint/typescript-eslint/issues/3950
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "warn",
    "import/order": [
      "warn",
      {
        groups: [
          "type",
          "builtin",
          "external",
          "internal",
          ["index", "sibling", "parent", "object"],
        ],
        pathGroups: [
          {
            pattern: "*.scss?inline",
            group: "internal",
            patternOptions: { matchBase: true },
            position: "after",
          },
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "import/no-unresolved": ["warn", { ignore: ["\\.scss\\?inline$"] }],
  },
};

// eslint-disable-next-line no-undef
module.exports = config;
