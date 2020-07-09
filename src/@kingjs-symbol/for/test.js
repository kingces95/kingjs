var assert = require('assert')
var For = require('@kingjs-symbol/for')

var actual = Symbol[For]('@kingjs-foo', 'exportExtension', '1.2.3')
var expected = Symbol.for('exportExtension, @kingjs-foo, v1.2.3')
assert.ok(actual, expected)