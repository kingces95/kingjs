require('kingjs');
var union = require('..');
var assert = require('assert');
var toArray = require('@kingjs/linq.to-array');

function readme() {
  var result = union.call(
    sequence(0, 0, 1, 2),
    sequence(1, 3, 3)
  );
  
  result = toArray.call(result);

  assert(result.length = 4);
  assert(result[0] == 0);
  assert(result[1] == 1);
  assert(result[2] == 2);
  assert(result[3] == 3);
}
readme();

function readmeWrapped() {
  var result = union.call(
    sequence({ id: 0 }, { id: 0 }, { id: 1 }, { id: 2 }),
    sequence({ id: 1 }, { id: 3 }, { id: 3 }),
    function(x) { return x.id; }
  );
  
  result = toArray.call(result);

  assert(result.length = 4);
  assert(result[0].id == 0);
  assert(result[1].id == 1);
  assert(result[2].id == 2);
  assert(result[3].id == 3);
}
readmeWrapped();