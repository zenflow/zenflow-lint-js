const { promisify } = require('util')
const fs = require('fs')
const findUp = require('find-up')
const deepEqual = require('deep-equal')

const readFile = promisify(fs.readFile)

module.exports = async () => {
  const userPkgFile = await findUp('package.json')
  const userPkgText = await readFile(userPkgFile, 'utf8')
  const origUserPkg = JSON.parse(userPkgText)
  const userPkg = JSON.parse(userPkgText)
  // extract and isolate unit test script from "test" to "test-only" if it makes sense
  if (userPkg.scripts.test && !userPkg.scripts['test-only']) {
    const testScriptParts = userPkg.scripts.test.split(' && ')
    if (testScriptParts.length > 1) {
      // looks like it's already a group of various checks, do nothing
    } else if (testScriptParts[0].startsWith('npm run ')) {
      // looks like it's already referring to an isolated package script, do nothing
    } else {
      userPkg.scripts['test-only'] = userPkg.scripts.test
      userPkg.scripts.test = 'npm run test-only'
    }
  }
  for (const [scriptName, code] of [
    ['fix', 'zenflow-lint-js --fix'],
    ['lint', 'zenflow-lint-js'],
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
    console.log('updated package scripts.')
  }
}
