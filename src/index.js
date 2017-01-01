/**
 *
 * @module stringify-anything
 */
;(function () {
  'use strict'

  /* imports */
  var safeStringify = require('json-stringify-safe')

  /* exports */
  module.exports = stringify

  /**
   *
   * @param {*} anything to be stringified
   * @return {String} a reasonable string representation of anything
   */
  function stringify (anything) {
    if (anything === null) {
      return 'null'
    }

    if (anything === undefined) {
      return 'undefined'
    }

    if (
      anything.hasOwnProperty('toString') &&
        typeof anything.toString === 'function'
    ) {
      return anything.toString()
    }

    if (typeof anything === 'function') {
      return anything.name || 'anonymousFunction'
    }

    return safeStringify(anything)
  }
})()

