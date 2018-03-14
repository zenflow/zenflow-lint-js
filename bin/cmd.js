#!/usr/bin/env node

const args = process.argv.slice(2)
const scriptName = args[0] === 'install' ? 'install' : 'default'
require(`../scripts/${scriptName}`)().catch(error => {
  console.error(error)
  process.exit(1)
})
