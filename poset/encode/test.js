'use strict';

var encodePoset = require('./index');
var assert = require('@kingjs/assert');

function readMe() {
  var poset = encodePoset({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, {
    a: [ 'b', 'c' ],
    b: [ 'd' ],
    c: [ 'd' ],
  });

  assert(Object.keys(poset).length == 4);
  assert(poset.a$b$c == 1);
  assert(poset.b$d == 2);
  assert(poset.c$d == 3);
  assert(poset.d == 4);
}
readMe();