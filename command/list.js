'use strict'
const chalk = require('chalk')
const config = require('../templates')

module.exports = () => {
  console.log(chalk.green('Name            URL'))
  const configArry = Object.keys(config.tpl)
  const configArryValue = Object.values(config.tpl)

  const handlerList = []
  configArry.forEach((i, index) => {
    handlerList.push({
      name: configArry[index],
      url: configArryValue[index].url,
    })
  })

  handlerList.forEach((item) => {
    console.log(chalk.cyan(`${item.name}            ${item.url}`))
  })

  process.exit()
}
