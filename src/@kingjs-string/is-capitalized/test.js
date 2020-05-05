var assert = require('assert')
var IsCapitalized = require('@kingjs-string/is-capitalized')

assert('Foo'[IsCapitalized]() == true)
assert('foo'[IsCapitalized]() == false)
