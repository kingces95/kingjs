'use strict';

var forEach = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function readMe() {

  var tree = [['bob'], 'chris', 'alice'];

  var result = { };
  forEach(
    tree,
    x => result[x] = true
  )

  assert(result.bob);
  assert(result.chris);
  assert(result.alice);
}
readMe();

require('./theory');