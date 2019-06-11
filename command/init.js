'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const config = require('../projects')

module.exports = () => {
  co(function*() {
    let tplName = yield prompt('Template name(mobile is "reactapp"): ')
    let projectName = yield prompt('Project name: ')
    let projectGitUrl = yield prompt('Your project git HTTP url: ')
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

      // set git remote
      exec(`git remote set-url origin ${projectGitUrl}`, {
        cwd: `./${projectName}`
      })

      // git push
      exec(`git push -u origin master`, {
        cwd: `./${projectName}`
      })
      console.log(
        chalk.green(
          '\n √ Generation completed! \n Thank you for using this tool!!'
        )
      )
      console.log('\n You can run commands below first:')
      console.log(`\n 1. cd ${projectName}`)
      console.log(`\n 2. npm install \n`)

      process.exit()
    })
  })
}
