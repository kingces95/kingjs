var assert = require('assert');
var parse = require('..');

assert.deepEqual({
  major: 10,
  minor: 20,
  patch: 30
}, parse('10.20.30'));