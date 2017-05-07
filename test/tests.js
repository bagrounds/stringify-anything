;(function () {
  'use strict'

  /* imports */
  var funTest = require('fun-test')
  var predicate = require('fun-predicate')

  /* exports */
  module.exports = [
    {
      inputs: [new Error('error message')],
      predicate: predicate.equal('Error: error message')
    },
    {
      inputs: ['a string'],
      predicate: predicate.equal('"a string"')
    },
    {
      inputs: [3],
      predicate: predicate.equal('3')
    },
    {
      inputs: [true],
      predicate: predicate.equal('true')
    },
    {
      inputs: [null],
      predicate: predicate.equal('null')
    },
    {
      inputs: [undefined],
      predicate: predicate.equal('undefined')
    },
    {
      inputs: [{}],
      predicate: predicate.equal('{}')
    },
    {
      inputs: [{a: 'a'}],
      predicate: predicate.equal('{a:"a"}')
    },
    {
      inputs: [{a: {a: 'a'}}],
      predicate: predicate.equal('{a:{a:"a"}}')
    },
    {
      inputs: [[]],
      predicate: predicate.equal('[]')
    },
    {
      inputs: [[[]]],
      predicate: predicate.equal('[[]]')
    },
    {
      inputs: [function functionName () {}],
      predicate: predicate.equal('functionName()')
    },
    {
      inputs: [(function () { return function () {} })()],
      predicate: predicate.equal('()=>')
    },
    {
      inputs: [/^.$/],
      predicate: predicate.equal('/^.$/')
    },
    {
      inputs: [Error('uh oh')],
      predicate: predicate.equal('Error: uh oh')
    }
  ].map(funTest.sync)
})()

