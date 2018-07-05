'use strict'

const movementEvents = require('./app/eventFunctions/movementEvents');
const accountEvents = require('./app/eventFunctions/accountEvents');

/**
 * Expose all functions
 */
module.exports = Object.assign({},
  /**
   * Movement triggers
   */
  movementEvents,

  /**
   * Account triggers
   */
  accountEvents
)
