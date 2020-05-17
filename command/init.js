'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const ora = require('ora')

module.exports = () => {
  co(function*() {
    // 处理用户输入
    let tplName = yield prompt(chalk.yellow('选择模板: '))
    let projectName = yield prompt(chalk.yellow('输入项目名称: '))
    let gitUrl
    let branch

    if (!config.tpl[tplName]) {
      console.log(chalk.red('\n × 未找到该模板!'))
      process.exit()
    }
    gitUrl = config.tpl[tplName].url
    branch = config.tpl[tplName].branch

    // git命令，远程拉取项目并自定义项目名
    let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`
    let spinner = ora(chalk.cyan('开始构建... \n'))

    spinner.start()

    exec(cmdStr, (error, stdout, stderr) => {
      // console.log('stdout', stdout)
      // console.log('stderr', stderr)
      if (error) {
        console.log(error)
        spinner.fail()
        process.exit()
      }
      spinner.succeed()
      console.log(chalk.green('\n √ 构建成功!'))
      console.log(chalk.white(`\n cd ${projectName} && npm install \n`))
      process.exit()
    })
  })
}
