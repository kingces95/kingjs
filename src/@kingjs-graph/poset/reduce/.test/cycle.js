var assert = require('assert');
var Reduce = require('..');

var poset = {
  a: [ 'b' ],
  b: [ 'c' ],
  c: [ 'a' ],
};

assert.throws(() => poset[Reduce]());