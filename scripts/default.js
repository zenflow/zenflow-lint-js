const findUp = require('find-up')
const standardEngine = require('standard-engine')
const eslint = require('eslint')
const path = require('path')
const pkg = require('../package.json')

module.exports = async () => {
  standardEngine.cli({
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
  })
}
