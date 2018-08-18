var elementAtOrDefault = require('.');
var testRequire = require('..');
var sequence = testRequire('@kingjs/enumerable.create');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

assert(elementAtOrDefault.call(sequence(0, 1, 2), 1) == 1);

assert(elementAtOrDefault.call(sequence(0, 1, 2), 3) == undefined);

assertThrows(function() {
  elementAtOrDefault.call(sequence(0, 1, 2), -1)
});