var assert = require('assert');
var test = require('..');

var DotDirGlob = [
  '**/node_modules/**',
  /(^|[\/\\])\../
]

assert(test('.foo', DotDirGlob))
assert(test('foo/node_modules/bar', DotDirGlob))
assert(!test('foo', DotDirGlob))

assert(test('.temp/root/foo', ['**/foo']))
