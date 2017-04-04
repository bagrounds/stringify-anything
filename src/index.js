/**
 *
 * @module stringify-anything
 */
;(function () {
  'use strict'

  /* imports */
  var safeStringify = require('json-stringify-safe')
  var K = require('fun-constant')
  var funCase = require('fun-case')

  /* exports */
  module.exports = stringify

  function stringify (anything) {
    return funCase([
      {
        p: isUndefined,
        f: K('undefined')
      },
      {
        p: hasToStringMethod,
        f: toString
      },
      {
        p: isInstanceOf(Function),
        f: functionToString
      },
      {
        p: isInstanceOf(RegExp),
        f: toString
      },
      {
        p: isInstanceOf(Error),
        f: toString
      },
      {
        p: isInstanceOf(Array),
        f: arrayToString
      },
      {
        p: K(true),
        f: safeStringify
      }
    ])(anything)
  }

  function isInstanceOf (instance) {
    return function (a) {
      return a instanceof instance
    }
  }

  function isUndefined (x) {
    return x === undefined
  }

  function arrayToString (array) {
    return '[' + array.map(stringify).join(',') + ']'
  }

  function functionToString (x) {
    return x.name || '=>'
  }

  function toString (x) {
    return x.toString()
  }

  function hasToStringMethod (x) {
    return x &&
      x.hasOwnProperty('toString') &&
      isInstanceOf(Function)(x.toString)
  }
})()

