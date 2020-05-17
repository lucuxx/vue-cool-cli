'use strict'
const exec = require('child_process').exec
const co = require('co')
const chalk = require('chalk')

module.exports = (projectName) => {
  co(function*() {
    // git命令，远程拉取项目并自定义项目名
    let cmdStr = `git clone https://github.com/lucuxx/template2.git && cd ${projectName} && git checkout master`
    let spinner = ora(chalk.blue(`开始构建... \n`))

    spinner.start()

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        spinner.fail()
        process.exit()
      }
      spinner.succeed()
      console.log(chalk.green(`\n √ 构建成功!`))
      console.log(chalk.cyan(`\n cd ${projectName} && npm install \n`))
      process.exit()
    })
  })
}
