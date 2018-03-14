const { promisify } = require('util')
const fs = require('fs')
const findUp = require('find-up')
const deepEqual = require('deep-equal')
const exec = require('../util/exec')

const readFile = promisify(fs.readFile)

module.exports = async () => {
  await exec(`npm install zenflow-lint-js --save-dev`)

  console.log('')

  const userPkgFile = await findUp('package.json')
  const userPkgText = await readFile(userPkgFile, 'utf8')
  const origUserPkg = JSON.parse(userPkgText)
  const userPkg = JSON.parse(userPkgText)
  for (const [scriptName, code] of [
    ['lint', 'zenflow-lint-js'],
    ['lint-fix', 'zenflow-lint-js --fix'],
    ['test', 'npm run lint'],
  ]) {
    const script = userPkg.scripts[scriptName]
    if (!script) {
      userPkg.scripts[scriptName] = code
    } else if (!script.match(new RegExp(`(^|\\s)${code}(\\s|$)`))) {
      userPkg.scripts[scriptName] = `${code} && ${script}`
    }
    if (userPkg.scripts[scriptName] !== script) {
      console.log(`updating "${scriptName}" package script...`)
    }
  }
  if (!deepEqual(userPkg, origUserPkg)) {
    fs.writeFileSync(userPkgFile, JSON.stringify(userPkg, null, 2))
    console.log('updated.')
  }

  console.log('')

  await new Promise(resolve => setTimeout(resolve, 100))
  await exec(`npm run lint-fix`)
}
