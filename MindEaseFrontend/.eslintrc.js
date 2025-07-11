module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
    jest: true,
  },
  globals: {
    __DEV__: 'readonly',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': 'off', // Disable for Windows compatibility
    quotes: 'off', // Disable for existing code
    semi: ['error', 'always'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': ['warn'],
    'react-native/no-color-literals': 'off', // Disable for existing code
    'react-native/sort-styles': 'off', // Disable for existing code
  },
  overrides: [
    {
      files: ['src/components/ErrorBoundary.js'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
