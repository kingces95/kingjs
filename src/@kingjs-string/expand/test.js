var assert = require('assert')
var Expand = require('@kingjs-string/expand')

var foo = 'bar'
var result = 'Key "foo" is "${foo}"'[Expand]({ foo })
assert('Key "foo" is "bar"' == result)