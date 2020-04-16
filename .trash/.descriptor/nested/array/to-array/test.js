'use strict';

var toArray = require('.');

var assert = require('@kingjs/assert')

function readMe() {

  var result = toArray([
    'a', [
      'b', [
        'c'
      ], 'd'
    ], 'e'
  ]);

  assert(result instanceof Array);
  assert(result.length == 5);
  assert(result[0] == 'a');
  assert(result[1] == 'b');
  assert(result[2] == 'c');
  assert(result[3] == 'd');
  assert(result[4] == 'e');
}
readMe();

function nullIfNoMatches() {
  var result = toArray(undefined);
  assert(result == null);
}
nullIfNoMatches();

function nullIfNoTree() {
  var result = toArray();
  assert(result == null);
}
nullIfNoTree();

require('./theory');