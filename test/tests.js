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
    },
    {
      input: true,
      result: funAssert.equal('true'),
      sync: true
    },
    {
      input: null,
      result: funAssert.equal('null'),
      sync: true
    },
    {
      input: undefined,
      result: funAssert.equal('undefined'),
      sync: true
    },
    {
      input: {},
      result: funAssert.equal('{}'),
      sync: true
    },
    {
      input: {a: 'a'},
      result: funAssert.equal('{"a":"a"}'),
      sync: true
    },
    {
      input: {a: {a: 'a'}},
      result: funAssert.equal('{"a":{"a":"a"}}'),
      sync: true
    },
    {
      input: [],
      result: funAssert.equal('[]'),
      sync: true
    },
    {
      input: [[]],
      result: funAssert.equal('[[]]'),
      sync: true
    },
    {
      input: function functionName () {},
      result: funAssert.equal('functionName'),
      sync: true
    },
    {
      input: function () {},
      result: funAssert.equal('anonymousFunction'),
      sync: true
    },
    {
      input: functionWithToStringMethod(),
      result: funAssert.equal(functionWithToStringMethod().toString()),
      sync: true
    },
    {
      input: functionWithToStringProperty(),
      result: funAssert.equal(functionWithToStringProperty().name),
      sync: true
    },
    {
      input: objectWithToStringProperty(),
      result: funAssert.equal('{"toString":"gotcha!"}'),
      sync: true
    },
    {
      input: objectWithToStringMethod(),
      result: funAssert.equal(objectWithToStringMethod().toString()),
      sync: true
    }
  ].map(funTest)

  function functionWithToStringMethod () {
    function result () {}

    result.toString = function toString () {
      return 'a special representation'
    }

    return result
  }

  function functionWithToStringProperty () {
    function result () {}

    result.toString = 'gotcha!'

    return result
  }

  function objectWithToStringProperty () {
    var result = {
      toString: 'gotcha!'
    }

    return result
  }

  function objectWithToStringMethod () {
    var result = {
      toString: function toString () {
        return 'a special representation'
      }
    }

    return result
  }
})()

