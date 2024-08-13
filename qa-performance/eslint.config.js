import js from "@eslint/js";
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'
import globals from 'globals'

const customPlugin = {
  rules: {
    'no-private-fields': {
      create(context) {
        return {
          ClassPrivateProperty(node) {
            context.report({
              node,
              message: 'Private class fields are not allowed. K6 is using ES6',
            });
          },
          PrivateIdentifier(node) {
            context.report({
              node,
              message: 'Private class fields are not allowed. K6 is using ES6',
            });
          },
        };
      },
    },
  },
}

const customGlobals = {
  ...globals.browser,
  __ENV: 'readonly'
}
export default [
  {
    ...js.configs.recommended,
    files: ["src/**/*.js"],
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './jsconfig.json'
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...customGlobals,
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'warn'
    },
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...customGlobals,
      }
    },
    plugins: {
      custom: customPlugin,
    },
    rules: {
      semi: ['error', 'never'],
      'no-extra-semi': 'error',
      indent: ['error', 2],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      'no-undef': 'error',
      'require-await': 'warn',
      'custom/no-private-fields': 'error',
    },
  },
  {
    files: ['.eslintrc.js'],
    languageOptions: {
      sourceType: 'script',
    },
  },
]
