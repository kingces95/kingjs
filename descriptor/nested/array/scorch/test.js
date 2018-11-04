'use strict';

var scorch = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  'use strict';

  var values = [
    undefined,
    ['tiger'],
    [undefined]
  ]

  scorch(values);

  assert(values.length == 2);
  assert(values[0] == 'tiger');
  assert(values[1].length == 0);
}
readMe();

function simple() {
  var result = scorch();
  assert(result === undefined);
  
  var result = scorch([]);
  assert(result.length == 0);

  var result = scorch([ undefined ]);
  assert(result.length == 0);

  var result = scorch([ [ undefined ] ]);
  assert(result[0].length = 0);
}
simple();

require('./theory');