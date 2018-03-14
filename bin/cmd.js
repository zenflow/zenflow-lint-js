#!/usr/bin/env node

const standardEngine = require('standard-engine')
const eslint = require('eslint')
const path = require('path')
const findUp = require('find-up')
const pkg = require('../package.json')

const options = {
  eslint,
  eslintConfig: {
    configFile: path.join(__dirname, '..', '.eslintrc.json'),
    ignorePath: findUp.sync('.gitignore'), // TODO: recursive dot-file concatentator package?
  },
  cmd: pkg.name,
  version: pkg.version,
  tagline: pkg.description,
  bugs: pkg.bugs.url,
  homepage: pkg.homepage,
}

standardEngine.cli(options)
