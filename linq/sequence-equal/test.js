var sequenceEqual = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function readme() {
  var expected = [1, 2, 3];
  
  var toFew = [1, 2];
  var tooMany = [1, 2, 3, 4];
  var wrongOrder = [3, 2, 1];
  var justRight = [1, 2, 3];
  
  var result = {
    tooFew: expected[sequenceEqual](toFew),
    tooMany: expected[sequenceEqual](tooMany),
    wrongOrder: expected[sequenceEqual](wrongOrder),
    justRight: expected[sequenceEqual](justRight),
  };

  assert(result.tooFew == false);
  assert(result.tooMany == false);
  assert(result.wrongOrder == false);
  assert(result.justRight == true);
}
readme();

function test(left, right, result, equal) {
  assert(left[sequenceEqual](right,
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