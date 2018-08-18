var elementAt = require('.');
var testRequire = require('..');
var sequence = testRequire('@kingjs/enumerable.create');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

assert(elementAt.call(sequence(0, 1, 2), 1) == 1);

assertThrows(function() {
  elementAt.call(sequence(0, 1, 2), 3)
});

assertThrows(function() {
  elementAt.call(sequence(0, 1, 2), -1)
});