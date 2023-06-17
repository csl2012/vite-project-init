/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    './.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es6: true
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
