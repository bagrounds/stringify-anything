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
    },
    {
      input: 3,
      result: funAssert.equal('3'),
      sync: true
    }
  ].map(funTest)
})()

