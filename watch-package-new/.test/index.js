var assert = require('assert')
var minimatch = require('minimatch')

var regex = minimatch.makeRe('**/*.js')
assert(regex.test('bar.js'))