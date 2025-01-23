import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    ignores: [
      'node_modules',
      'dist',
      'rollup.*.js',
      'jest.config.js',
      'docs',
      '*.js',
      '*.cjs',
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
];

// {
//   "env": {
//     "browser": true,
//     "es2021": true,
//     "node": true
//   },
//   "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
//   "overrides": [],
//   "parser": "@typescript-eslint/parser",
//   "parserOptions": {
//     "ecmaVersion": "latest",
//     "sourceType": "module"
//   },
//   "plugins": ["@typescript-eslint"],
//   "rules": {
//     "indent": ["error", 2],
//     "linebreak-style": ["error", "unix"],
//     "quotes": ["error", "single"],
//     "semi": ["error", "always"]
//   }
// }
