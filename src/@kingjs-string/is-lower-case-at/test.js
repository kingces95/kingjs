var assert = require('assert')
var IsLowerCaseAt = require('@kingjs-string/is-lower-case-at')

assert('Foo'[IsLowerCaseAt](0) == false)
assert('Foo'[IsLowerCaseAt](1) == true)