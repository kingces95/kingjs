var single = require('.');
var testRequire = require('..');
var sequence = testRequire('@kingjs/enumerable.create');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

assert(single.call(sequence(0)) == 0);
assertThrows(function() { 
  single.call(sequence());
});
assertThrows(function() { 
  single.call(sequence(0, 1))
});

function isOdd(x) {
  return x % 2 == 1; 
}

assert(single.call(sequence(0, 1, 2), isOdd) == 1);
assertThrows(function() { 
  single.call(sequence(), isOdd)
});
assertThrows(function() { 
  single.call(sequence(0), isOdd)
});
assertThrows(function() { 
  single.call(sequence(0, 1, 3), isOdd)
});
