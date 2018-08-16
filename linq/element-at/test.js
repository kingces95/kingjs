var elementAt = require('./index');
var sequence = require('@kingjs/sequence');
var assert = require('@kingjs/assert');
var assertThrows = require('@kingjs/assert-throws');

assert(elementAt.call(sequence(0, 1, 2), 1) == 1);

assertThrows(function() {
  elementAt.call(sequence(0, 1, 2), 3)
});

assertThrows(function() {
  elementAt.call(sequence(0, 1, 2), -1)
});