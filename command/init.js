'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const config = require('../projects')

module.exports = () => {
  co(function*() {
    let tplName = yield prompt('Template name: ')
    let projectName = yield prompt('Project name: ')
    let gitUrl
    let branch

    if (!config[tplName]) {
      console.log(chalk.red('\n × Template does not exit!'))
      process.exit()
      return
    }
    gitUrl = config[tplName].url
    branch = config[tplName].branch

    let cmdStr = `git clone -b ${branch} ${gitUrl} ${projectName}`

    console.log(chalk.white('\n Start generating...'))

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      console.log(chalk.green('\n √ Generation completed!'))
      console.log(
        chalk.red(
          `\n Before start your project, \n you must reset the git push remote url!!`
        )
      )
      console.log(`\n 1: cd ${projectName}`)
      console.log(`\n 2: git remote set-url origin http://your_git_address `)
      console.log(`\n 3: git push -u origin master `)
      console.log(`\n 4: npm install\n\n`)
      process.exit()
    })
  })
}
