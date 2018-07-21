'use strict'

module.exports = {
  /**
   * No route found
   * @param {Object} req
   * @param {Object} res
   */
  notFound(request, response) {
    response.status(404).json({
      message: '404'
    })
  }
}
