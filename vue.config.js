// configure webpack
module.exports = {
  // customize pwa options
  pwa: {
    name: 'Budget Tracker',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  },

  // Add options.version to html-webpack-plugin
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].version = require('./package.json').version
        return args
      })
  }
}
