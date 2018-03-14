#!/usr/bin/env node

const { promisify } = require('util')
const fs = require('fs')
const findUp = require('find-up')
const standardEngine = require('standard-engine')
const eslint = require('eslint')
const path = require('path')
const deepEqual = require('deep-equal')
const exec = require('../util/exec')
const pkg = require('../package.json')

const args = process.argv.slice(2)
const readFile = promisify(fs.readFile)

async function main() {
  if (args[0] === 'install') {
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
  } else {
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
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
