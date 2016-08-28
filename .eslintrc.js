module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: [
    'react'
  ],
  env: {
    mocha: true,
  },
  globals: {
    sinon: false,
    expect: false,
  },
  rules: {
    'import/no-extraneous-dependencies': ["error", {"devDependencies": true} ]
  }
};
