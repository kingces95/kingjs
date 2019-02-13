var elementAtOrDefault = require('..');

require('kingjs');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

assert(elementAtOrDefault.call([1, 2, 3], 1) == 1);

assert(elementAtOrDefault.call([1, 2, 3], 3) == undefined);

assertThrows(function() {
  elementAtOrDefault.call([1, 2, 3], -1)
});