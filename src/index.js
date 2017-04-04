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
        p: funPredicate.type('Function'),
        f: functionToString
      },
      {
        p: funPredicate.type('Undefined'),
        f: K('undefined')
      },
      {
        p: funPredicate.type('RegExp'),
        f: toString
      },
      {
        p: funPredicate.type('Error'),
        f: toString
      },
      {
        p: funPredicate.type('Array'),
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
      funPredicate.type('Function', x.toString)
  }
})()

