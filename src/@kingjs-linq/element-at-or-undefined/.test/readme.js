require('kingjs');
var ElementAtOrDefault = require('..');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

assert([0, 1, 2][ElementAtOrDefault](1) == 1);

assert([0, 1, 2][ElementAtOrDefault](3) == undefined);

assertThrows(function() {
  [1, 2, 3][ElementAtOrDefault](-1)
});