const exec = require('../util/exec')
const updatePackageScripts = require('./install/updatePackageScripts')
const handleEditorConfig = require('./default/handleEditorConfig')

module.exports = async () => {
  await exec(`npm install zenflow-lint-js --save-dev`)
  console.log('')
  await updatePackageScripts()
  console.log('')
  await handleEditorConfig()
  console.log('')
  await exec(`npm run fix`)
}
