/**
 *
 * @module stringify-anything
 */
;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var array = require('fun-array')
  var object = require('fun-object')

  /* exports */
  module.exports = stringify

  /**
   *
   * @function module:stringify-anything.stringify
   *
   * @param {*} anything - to stringify
   *
   * @return {String} representation of anything
   */
  function stringify (anything) { // eslint-disable-line max-statements
    if (predicate.type('Null|Boolean|Number|String', anything)) {
      return JSON.stringify(anything)
    }

    if (predicate.type('Undefined', anything)) {
      return 'undefined'
    }

    if (predicate.type('Function', anything)) {
      return anything.name
        ? anything.name +
        '(' + array.repeat(anything.length, '').join(',') + ')'
        : '(' + array.repeat(anything.length, '').join(',') + ')=>'
    }

    if (anything instanceof RegExp || anything instanceof Error) {
      return anything.toString()
    }

    if (predicate.type('Array', anything)) {
      return '[' + array.map(stringify, anything).join(',') + ']'
    }

    if (predicate.type('Object', anything)) {
      return '{' +
        array.zipWith(
          join,
          object.keys(anything),
          object.values(anything).map(stringify)
        ).join(',') +
        '}'
    }
  }

  function join (key, value) {
    return key + ':' + value
  }
})()

