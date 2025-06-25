module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  extends: [
    'eslint:recommended'
  ],
  overrides: [
    {
      // JavaScript files
      files: ['**/*.js'],
      parser: '@babel/eslint-parser',
      plugins: ['babel'],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      // TypeScript files
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-var-requires': 'off',
        'no-undef': 'off' // TypeScript handles this
      }
    }
  ]
}; 