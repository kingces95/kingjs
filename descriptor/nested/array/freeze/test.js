'use strict';

var freeze = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  'use strict';

  var values = [
    {},
    [{}],
    0
  ]

  freeze(values);

  assert(Object.isFrozen(values));
  assert(Object.isFrozen(values[0]));
  assert(Object.isFrozen(values[0]));
  assert(Object.isFrozen(values[0][0]));
}
readMe();

require('./theory');