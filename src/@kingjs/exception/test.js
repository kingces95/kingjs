var assert = require('assert')
var Exception = require('@kingjs/exception')
var Expand = require('@kingjs-string/expand')

var ExceptionMessage = "Argument value '${argument}' is unexpected."

class MyException extends Exception {
  constructor(argument) {
    super(ExceptionMessage, { argument })
  }
}

function test(argument) {
  throw new MyException(argument)
}

assert.throws(
  () => test(42), 
  new MyException(42), 
  ExceptionMessage[Expand]({ argument: 42 })
)