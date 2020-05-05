require('kingjs');
var SingleOrUndefined = require('..');
var assert = require('assert');

assert([0][SingleOrUndefined]() == 0);
assert([][SingleOrUndefined]() === undefined);
assert([0, 1][SingleOrUndefined]() === undefined);

function isOdd(x) {
  return x % 2 == 1; 
}

assert([0, 1, 2][SingleOrUndefined](isOdd) == 1);
assert([][SingleOrUndefined](isOdd) === undefined);
assert([0][SingleOrUndefined](isOdd) === undefined);
assert([0, 1, 2, 3][SingleOrUndefined](isOdd) === undefined);

