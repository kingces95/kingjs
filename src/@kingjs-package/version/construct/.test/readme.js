var assert = require('assert');
var construct = require('..');

assert(construct({ 
  major: 1,
  minor: '2',
  patch: 3
}) == '1.2.3');