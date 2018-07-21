'use strict'

const { functions } = require('./app/firebase')
const movementEvents = require('./app/eventFunctions/movementEvents');
const accountEvents = require('./app/eventFunctions/accountEvents');
const app = require('./app/index')

/**
 * Expose Express API as a single Cloud Function
 */
const api = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}` // prepend '/' to keep query params if any
  }
  return app(request, response)
})

/**
 * Expose all functions
 */
module.exports = Object.assign(
  
  /**
   * API with express
   */
  { api },
  
  /**
   * Movement triggers
   */
  movementEvents,

  /**
   * Account triggers
   */
  accountEvents
)
