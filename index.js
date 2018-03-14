const standardEngine = require('standard-engine')
const options = require('./options')

module.exports = standardEngine.linter(options)
