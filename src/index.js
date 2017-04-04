/**
 *
 * @module stringify-anything
 */
;(function () {
  'use strict'

  /* imports */
  var safeStringify = require('json-stringify-safe')
  var K = require('fun-constant')
  var funPredicate = require('fun-predicate')
  var curry = require('fun-curry')
  var funCase = require('fun-case')

  /* exports */
  module.exports = stringify

  function stringify (anything) {
    return funCase([
      {
        p: hasToStringMethod,
        f: toString
      },
      {
        p: curry(funPredicate.type)('Function'),
        f: functionToString
      },
      {
        p: curry(funPredicate.type)('Undefined'),
        f: K('undefined')
      },
      {
        p: curry(funPredicate.type)('RegExp'),
        f: toString
      },
      {
        p: curry(funPredicate.type)('Error'),
        f: toString
      },
      {
        p: curry(funPredicate.type)('Array'),
        f: arrayToString
      },
      {
        p: K(true),
        f: safeStringify
      }
    ])(anything)
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
      funPredicate.type('Function')(x.toString)
  }
})()

