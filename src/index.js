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

  var typeStringifier = {
    Null: typeOf,
    Undefined: typeOf,
    Error: toString,
    Array: function (array) {
      if (array.length) {
        return '[' + array.map(stringify) + ']'
      }

      return safeStringify(array)
    }
  }

  /**
   *
   * @param {*} anything to be stringified
   * @param {*} input if anything has toString that accepts input, use this
   * @return {String} a reasonable string representation of anything
   */
  function stringify (anything, input) {
    var type = typeOf(anything)

    if (typeStringifier[type]) {
      return typeStringifier[type](anything)
    }

    if (anything.hasOwnProperty('toString') &&
      typeOf(anything.toString) === 'Function') {
      return anything.toString(input)
    }

    if (type === 'Function') {
      return anything.name || 'anonymousFunction'
    }

    return safeStringify(anything)
  }

  function toString (x) {
    return x.toString()
  }

  function typeOf (x) {
    return Object.prototype.toString.call(x).slice(8, -1)
  }
})()

