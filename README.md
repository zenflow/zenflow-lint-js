# zenflow-lint-js

[![Build Status](https://travis-ci.org/zenflow/zenflow-lint-js.svg?branch=master)](https://travis-ci.org/zenflow/zenflow-lint-js)
[![npm version](https://badge.fury.io/js/zenflow-lint-js.svg)](https://www.npmjs.com/packages/zenflow-lint-js)
[![Dependencies Status](https://david-dm.org/zenflow/zenflow-lint-js.svg)](https://david-dm.org/zenflow/zenflow-lint-js)
[![Greenkeeper badge](https://badges.greenkeeper.io/zenflow/zenflow-lint-js.svg)](https://greenkeeper.io/)
![semantic-release badge](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A zero-config opinionated and awesome js linter

# Features

- rules from [eslint-config-zenflow](https://github.com/zenflow/eslint-config-zenflow#readme)
  - based on [standard](https://github.com/standard/standard) style
  - [prettier](https://github.com/prettier/prettier)
  - [more](https://github.com/zenflow/eslint-config-zenflow#rules)
- cli interface of standard via [standard-engine](https://github.com/standard/standard-engine))
- ignores based off your `.gitignore`
- `npx zenflow-lint-js install` for (usually fully-automatic) integration
  - installs itself as a dev dependency
  - adds standard `lint` and `fix` package scripts
  - integrates with `test` package script
  - takes care of your `.editorconfig`
  - fixes fixable lint errors
  - reports lint errors that need attention

# Changes

See [CHANGELOG.md](./CHANGELOG.md)
