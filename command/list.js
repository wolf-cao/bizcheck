'use strict'
const config = require('../projects')

module.exports = () => {
  console.log(`\nList is: \n\n${JSON.stringify(config)}\n\n`)
  process.exit()
}
