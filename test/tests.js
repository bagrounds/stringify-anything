;(function () {
  'use strict'

  /* imports */
  var funTest = require('fun-test')
  var funAssert = require('fun-assert')

  /* exports */
  module.exports = [
    {
      input: 'a string',
      result: funAssert.equal('"a string"'),
      sync: true
    }
  ].map(funTest)
})()

