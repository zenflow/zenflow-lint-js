const exec = require('../util/exec')
const updatePackageScripts = require('./install/updatePackageScripts')

module.exports = async () => {
  await exec(`npm install zenflow-lint-js --save-dev`)
  console.log('')
  await updatePackageScripts()
  console.log('')
  await exec(`npm run fix`)
}
