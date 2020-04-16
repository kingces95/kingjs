'use strict';

var freeze = require('.');

var assert = require('@kingjs/assert')

function readMe() {
  'use strict';

  var values = [
    {},
    [{}],
    0
  ]

  var result = freeze(values);

  assert(values == result);
  assert(Object.isFrozen(result));
  assert(Object.isFrozen(result[0]));
  assert(Object.isFrozen(result[0]));
  assert(Object.isFrozen(result[0][0]));
}
readMe();

require('./theory');