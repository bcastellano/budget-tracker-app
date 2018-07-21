'use strict'

const mainController = require('./controllers/mainController')
const statsController = require('./controllers/statsController')

module.exports = app => {
  // stats by month
  app.get('/stats/balance', statsController.balance)

  // 404
  app.get('*', mainController.notFound)
}
