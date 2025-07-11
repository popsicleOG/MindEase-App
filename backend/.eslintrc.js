module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": "off", // Disable for Windows compatibility
    quotes: "off", // Disable for existing code
    semi: ["error", "always"],
    "no-unused-vars": ["warn"],
    "no-console": "off", // Disable for existing code
  },
};
