const path = require('path')
const chalk = require('chalk')
const execa = require('execa')

const args = require('minimist')(process.argv.slice(2))
const targets = args._

if (process.env.CI && targets[0]) {
  const pkgDir = path.resolve(__dirname, '../packages', target)
  const target = targets[0]
  const distDir = path.resolve(pkgDir, 'dist')
  const semanticReleaseConfig = path.resolve(pkgDir, 'semantic-release.json')
  execa('zip', [`${target}vue-quill-dist.zip`, '-r', distDir])
  execa('npx', ['semantic-release', '--extends', semanticReleaseConfig])
} else {
  console.log(chalk.redBright("You can't run semantic-release locally"))
}