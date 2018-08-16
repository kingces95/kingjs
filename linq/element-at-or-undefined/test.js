var elementAtOrDefault = require('./index');
var sequence = require('@kingjs/sequence');
var assert = require('@kingjs/assert');
var assertThrows = require('@kingjs/assert-throws');

assert(elementAtOrDefault.call(sequence(0, 1, 2), 1) == 1);

assert(elementAtOrDefault.call(sequence(0, 1, 2), 3) == undefined);

assertThrows(function() {
  elementAtOrDefault.call(sequence(0, 1, 2), -1)
});