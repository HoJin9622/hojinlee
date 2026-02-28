import js from "@eslint/js";
import globals from "globals";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    ignores: [".husky/**", ".vscode/**", ".astro/**", "public/**", "dist/**"],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node, ...globals.browser },
    },
  },
  js.configs.recommended,
  ...eslintPluginAstro.configs["flat/recommended"],
];
