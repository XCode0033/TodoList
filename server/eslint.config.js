const js = require('@eslint/js')
const tseslint = require('typescript-eslint')
const prettier = require('eslint-config-prettier')
const globals = require('globals')

module.exports = tseslint.config(
  { ignores: ['dist/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['eslint.config.js', 'migrations/**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
)
