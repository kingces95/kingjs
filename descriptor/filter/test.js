'use strict';

var filter = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  var result = filter.call({
    zero: 0,
    include: null,
    exclude: null,
  }, (value, name) => name == 'include' || value == 0, 
  );

  assert(Object.keys(result).length == 2);
  assert(result.include == null);
  assert(result.zero == 0);
}
readMe();

function empty() {
  assert(filter.call({ }, { foo: 'bar' }) === null);
}
empty();