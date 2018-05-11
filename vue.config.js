// configure webpack
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].version = require('./package.json').version
        return args
      })
  }
}
