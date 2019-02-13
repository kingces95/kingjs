var elementAt = require('..');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

assert(elementAt.call([1, 2, 3], 1) == 1);

assertThrows(function() {
  elementAt.call([1, 2, 3], 3)
});

assertThrows(function() {
  elementAt.call([1, 2, 3], -1)
});