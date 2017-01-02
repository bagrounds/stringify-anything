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
   * @param {*} input if anything has toString that accepts input, use this
   * @return {String} a reasonable string representation of anything
   */
  function stringify (anything, input) {
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
      return anything.toString(input)
    }

    if (typeof anything === 'function') {
      return anything.name || 'anonymousFunction'
    }

    return safeStringify(anything)
  }
})()

