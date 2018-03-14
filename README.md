# zenflow-lint-js

[![Build Status](https://travis-ci.org/zenflow/zenflow-lint-js.svg?branch=master)](https://travis-ci.org/zenflow/zenflow-lint-js)
[![Dependencies Status](https://david-dm.org/zenflow/zenflow-lint-js.svg)](https://david-dm.org/zenflow/zenflow-lint-js)
[![npm version](https://badge.fury.io/js/zenflow-lint-js.svg)](https://www.npmjs.com/packages/zenflow-lint-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![semantic-release badge](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)
[![Greenkeeper badge](https://badges.greenkeeper.io/zenflow/zenflow-lint-js.svg)](https://greenkeeper.io/)

A standard js linter

- rules from [eslint-config-zenflow](https://github.com/zenflow/eslint-config-zenflow#readme)
- cli interface of [standard](https://github.com/standard/standard) (via [standard-engine](https://github.com/standard/standard-engine))
- ignores based off your `.gitignore`
- `npx zenflow-lint-js install` for usually fully-automatic integration
  - installs itself as a dev dependency
  - adds standard package scripts
  - takes care of your `.editorconfig`
  - fixes fixable lint errors
  - reports lint errors that need attention
