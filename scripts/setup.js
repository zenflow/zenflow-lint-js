const updatePackageScripts = require('./setup/updatePackageScripts')
const handleEditorConfig = require('./default/handleEditorConfig')

module.exports = async () => {
  await updatePackageScripts()
  await handleEditorConfig()
  console.log('zenflow-lint-js is set up')
}
