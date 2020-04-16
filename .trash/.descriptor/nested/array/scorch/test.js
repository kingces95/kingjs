'use strict';

var scorch = require('.');

var assert = require('@kingjs/assert')

function readMe() {
  'use strict';

  var values = [
    undefined,
    ['tiger'],
    [undefined]
  ]

  values = scorch(values);

  assert(values.length == 2);
  assert(values[0] == 'tiger');
  assert(values[1].length == 0);
}
readMe();

function readMeFrozen() {
  'use strict';

  var values = [
    undefined,
    ['tiger'],
    [undefined]
  ]

  var result = scorch(values);

  assert(result != values);
  assert(result instanceof Array);
  assert(result.length == 2);
  assert(result[0] == 'tiger');
  assert(result[1].length == 0);
}
readMeFrozen();

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