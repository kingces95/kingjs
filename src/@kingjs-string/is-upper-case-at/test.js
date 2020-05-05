var assert = require('assert')
var IsUpperCaseAt = require('@kingjs-string/is-upper-case-at')

assert('Foo'[IsUpperCaseAt](0) == true)
assert('Foo'[IsUpperCaseAt](1) == false)