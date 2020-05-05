var assert = require('assert')
var StringBuilder = require('@kingjs-string/builder')

var sb = new StringBuilder(Buffer.from('Hello World!'))
assert.equal(sb.toString(), 'Hello World!')