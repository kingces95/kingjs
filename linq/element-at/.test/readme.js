require('kingjs');
var ElementAt = require('..');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

assert([0, 1, 2][ElementAt](1) == 1);

assertThrows(function() {
  [1, 2, 3][ElementAt](3)
});

assertThrows(function() {
  [1, 2, 3][ElementAt](-1)
});