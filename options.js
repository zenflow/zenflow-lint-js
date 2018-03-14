const eslint = require('eslint')
const path = require('path')
const pkg = require('./package.json')

const configFile = path.join(__dirname, '.eslintrc.json')
const ignorePath = path.join(__dirname, '.eslintignore')

module.exports = {
  eslint,
  eslintConfig: {
    configFile,
    ignorePath,
  },
  cmd: pkg.name,
  version: pkg.version,
  tagline: pkg.description,
  bugs: pkg.bugs.url,
  homepage: pkg.homepage,
}
