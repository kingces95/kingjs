var assert = require('assert')
var Expand = require('..')

var result = 'foo'[Expand]()
assert(result == 'foo')