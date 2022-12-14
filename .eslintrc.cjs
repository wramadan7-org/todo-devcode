module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'no-unused-vars': 'off',
    'func-names': 'off',
    'consistent-return': 'off',
    camelcase: 'off',
    'no-plusplus': 'off',
    'prefer-const': 'off',
  },
};
