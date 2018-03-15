const path = require('path')
const { loadFile, normalEols, writeFile } = require('../../util/util')

module.exports = async () => {
  const baseConfig = normalEols(
    await loadFile(require.resolve('eslint-config-zenflow/.editorconfig')),
  )
  const separator = '# zenflow-config-end'
  const userConfigFile = path.resolve('.editorconfig')
  const userConfig = normalEols(await loadFile(userConfigFile))
  if (!userConfig) {
    await writeFile(userConfigFile, `${baseConfig}\n${separator}\n`)
    console.log('editorconfig file saved.')
  } else {
    const userConfigLines = userConfig.split('\n')
    if (!userConfigLines.includes(separator)) {
      await writeFile(userConfigFile, `${baseConfig}\n${separator}\n`)
      console.log(`WARNING!
  Your \`.editorconfig\` file has been replaced!
  When editing this file you must leave everything up to and including the separator "${separator}" line.`)
    } else {
      const baseConfigLines = baseConfig.split('\n')
      const customUserConfigLines = userConfigLines.slice(
        userConfigLines.indexOf(separator) + 1,
      )
      await writeFile(
        userConfigFile,
        [...baseConfigLines, separator, ...customUserConfigLines].join('\n'),
      )
    }
  }
}
