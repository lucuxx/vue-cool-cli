'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {
  co(function*() {
    // 分步接收用户输入的参数
    let tplName = yield prompt(chalk.yellow('设置模板名称: '))
    let gitUrl = yield prompt(chalk.yellow('输入git仓库地址: '))
    let branch = yield prompt(chalk.yellow('输入git分支: '))

    // 避免重复添加
    if (!config.tpl[tplName]) {
      config.tpl[tplName] = {}
      config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '') // 过滤unicode字符
      config.tpl[tplName]['branch'] = branch
    } else {
      console.log(chalk.red('模板已经被注册!'))
      process.exit()
    }

    // 把模板信息写入templates.json
    fs.writeFile(
      __dirname + '/../templates.json',
      JSON.stringify(config),
      'utf-8',
      (err) => {
        if (err) console.log(err)
        console.log(chalk.green('新模板添加成功! \n'))
        console.log('\n')
        process.exit()
      }
    )
  })
}
