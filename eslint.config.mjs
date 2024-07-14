import pluginJs from "@eslint/js";
import globals from "globals";
import tse from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{ts,tsx,js}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          parser: "flow",
        },
      ],
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      "prefer-const": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
];
