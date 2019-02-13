require('kingjs');
var single = require('..');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

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

assert(single.call([1, 2, 3], isOdd) == 1);
assertThrows(function() { 
  single.call(sequence(), isOdd)
});
assertThrows(function() { 
  single.call(sequence(0), isOdd)
});
assertThrows(function() { 
  single.call(sequence(0, 1, 3), isOdd)
});
