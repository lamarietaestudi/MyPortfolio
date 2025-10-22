import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),

  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite
    ],
    plugins: {
      import: importPlugin,
      unicorn
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.jsx'] }
      }
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'import/no-unresolved': [
        'error',
        { caseSensitive: true, caseSensitiveStrict: true }
      ]
    }
  },
  {
    files: ['src/components/**/*.{js,jsx}', 'src/pages/**/*.{js,jsx}'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { pascalCase: true } }]
    }
  },
  {
    files: [
      'src/data/**/*.{js,jsx}',
      'src/utils/**/*.{js,jsx}',
      'src/routes/**/*.{js,jsx}'
    ],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { kebabCase: true } }]
    }
  },

  {
    files: ['eslint.config.js', 'vite.config.js'],
    rules: {
      'import/no-unresolved': 'off'
    }
  }
]);
