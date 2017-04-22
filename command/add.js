'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../projects')
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {
 	co(function *() {
  	let tplName = yield prompt('Project name: ')
  	let gitUrl = yield prompt('Git https link: ')
  	let branch = yield prompt('Branch: ')

    if (!config[tplName]) {
      config[tplName] = {}
      config[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '')
      config[tplName]['branch'] = branch
    } else {
      console.log(chalk.red('Project has already existed!'))
      process.exit()
    }

		fs.writeFile(__dirname + '/../projects.json', JSON.stringify(config), 'utf-8', (err) => {
			if (err) console.log(err)
			console.log(chalk.green('New project added!\n'))
      console.log(chalk.grey('The last projects list is: \n'))
      console.log(config)
      console.log('\n')
			process.exit()
		})
  })
}