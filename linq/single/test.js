var single = require('./index');
var sequence = require('@kingjs/sequence');
var assert = require('@kingjs/assert');
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
