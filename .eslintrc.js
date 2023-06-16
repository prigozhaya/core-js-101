module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
    es2020: true, 
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "linebreak-style": ["error", "windows"],
    'indent': 'off',
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
    "no-nested-ternary": "off",
    'prefer-template': "off",
    'max-len': ["error", { "code": 400 }],
    'no-plusplus': "off"
  },
};
