var sequenceEqual = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var sequence = testRequire('@kingjs/enumerable.create');

function readme() {
  var expected = sequence(1, 2, 3);
  
  var toFew = sequence(1, 2);
  var tooMany = sequence(1, 2, 3, 4);
  var wrongOrder = sequence(3, 2, 1);
  var justRight = sequence(1, 2, 3);
  
  var result = {
    tooFew: sequenceEqual.call(expected, toFew),
    tooMany: sequenceEqual.call(expected, tooMany),
    wrongOrder: sequenceEqual.call(expected, wrongOrder),
    justRight: sequenceEqual.call(expected, justRight),
  };

  assert(result.tooFew == false);
  assert(result.tooMany == false);
  assert(result.wrongOrder == false);
  assert(result.justRight == true);
}
readme();

function test(left, right, result, equal) {
  assert(sequenceEqual.call(
    sequence.apply(this, left), 
    sequence.apply(this, right),
    equal
  ) == result);
};

test([ ], [ ], true);
test([ 0 ], [ 0 ], true);
test([ 0, 1 ], [ 0, 1 ], true);

test([ 0 ], [ ], false);
test([ ], [ 0 ], false);
test([ 0, 1 ], [ 0, 0 ], false);

var myEqual = function(l,r) { return l == -r; }
test([ ], [ ], true, myEqual);
test([ 0 ], [ 0 ], true, myEqual);
test([ 0, 1 ], [ 0, 1 ], false, myEqual);
test([ 0, 1 ], [ 0, -1 ], true, myEqual);

test([ 0 ], [ ], false, myEqual);
test([ ], [ 0 ], false, myEqual);
test([ 0, 1 ], [ 0, 0 ], false, myEqual);