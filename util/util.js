const { promisify } = require('util')
const fs = require('fs')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const loadFile = async file => {
  let data = null
  try {
    data = await readFile(file, 'utf8')
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }
  }
  return data
}

const normalEols = text => text && text.split(/\r?\n/).join('\n')

module.exports = {
  readFile,
  writeFile,
  loadFile,
  normalEols,
}
