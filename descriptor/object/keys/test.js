'use strict';

var keys = require('.');

var assert = require('@kingjs/assert')

function readMe() {
  var base = { inherited: null };
  var derived = Object.create(base);
  derived.own = null;

  var result = keys.call(derived);
  result.sort();
  assert(result.length == 2);
  assert(result[0] == 'inherited');
  assert(result[1] == 'own');
}
readMe();