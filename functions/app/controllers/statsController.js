'use strict'

module.exports = {
  /**
   * User balance
   * @param {Object} req
   * @param {Object} res
   */
  balance(request, response) {
    response.json({
      message: 'user balance'
    })
  }
}
