var assert = require('assert')
var StringBuilder = require('..')

var sb = new StringBuilder(Buffer.from('Hello World!'))
assert.equal(sb.toString(), 'Hello World!')