module.exports = {
  root: true,
  plugins: ["react", "react-hooks", "jsx-a11y", "import", "@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "prettier",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["packages/*/tsconfig.json"],
  },
  rules: {
    "react/require-default-props": 0
  }
};