// eslint.config.js
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import stylistic from '@stylistic/eslint-plugin'
import prettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['dist/**', 'build/**', 'node_modules/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: true,
        document: true,
        console: true,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      '@stylistic': stylistic,
    },
    rules: {
      // --- React ---
      'react/react-in-jsx-scope': 'off', // Не нужен в React 17+
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // --- Стиль кода ---
      indent: 'off',
      '@stylistic/indent': ['error', 2],
      '@stylistic/jsx-indent': ['error', 2],
      '@stylistic/jsx-indent-props': ['error', 2],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],

      // --- Прочее ---
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  prettier, // 🔧 выключает конфликты с Prettier
]
