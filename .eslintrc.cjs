module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "standard",
    "prettier"
  ],
  parserOptions: {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '{react,react-dom/**,react-router-dom}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@src/**',
            group: 'parent',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'never',
      },
    ],
    "max-len": ["error", { "code": 80 }],
    "semi": ["error", "never", {"beforeStatementContinuationChars": "never"}],
    "semi-spacing": ["error", {"after": true, "before": false}],
    "semi-style": ["error", "first"],
    "no-extra-semi": "error",
    "no-unexpected-multiline": "error",
    "no-unreachable": "error",
    "array-bracket-spacing": [2, "always"],
    "block-spacing": 2,
    "brace-style": 2,
    "camelcase": 2,
    "comma-spacing": [2, {"before": false, "after": true}],
    "comma-style": [2, "last"],
    "computed-property-spacing": [2, "never"],
    "eol-last": 2,
    "indent": [2, 2],
    "key-spacing": [2, {"beforeColon": false, "afterColon": true}],
    "lines-around-comment":[2, {
      "beforeBlockComment": true,
      "beforeLineComment": true,
    }],
    "no-mixed-spaces-and-tabs": 2,
    "no-multiple-empty-lines": [2, {max: 2}],
    "no-trailing-spaces": 2,
    "object-curly-spacing": [2, "always"],
    "sort-vars": 2,
    "space-infix-ops": 2,
  },
}
