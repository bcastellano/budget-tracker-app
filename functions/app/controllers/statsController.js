'use strict'

const { MovementManager } = require('../models/MovementManager')

function getDateStart() {
  const now = new Date()
  now.setMonth(now.getMonth()-1)
  return now.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

function getDateEnd() {
  const now = new Date()
  return now.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

module.exports = {
  /**
   * User balance
   * @param {Object} req
   * @param {Object} res
   */
  balance(request, response) {
    const dateStart = request.query.ds || getDateStart()
    const dateEnd = request.query.de || getDateEnd()

    MovementManager
      .userBalance(request.user.user_id, dateStart, dateEnd)
      .then((data) => {
        response.json(data)
        return true
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }
}
