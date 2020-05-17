'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {
  co(function*() {
    // 接收用户输入的参数
    let tplName = yield prompt(chalk.yellow('删除模板名称: '))

    // 删除对应的模板
    if (config.tpl[tplName]) {
      config.tpl[tplName] = undefined
    } else {
      console.log(chalk.red('未找到匹配的模板'))
      process.exit()
    }

    // 写入template.json
    fs.writeFile(
      __dirname + '/../templates.json',
      JSON.stringify(config),
      'utf-8',
      (err) => {
        if (err) console.log(err)
        console.log(chalk.green('模板删除成功!'))
        console.log('\n')
        process.exit()
      }
    )
  })
}
