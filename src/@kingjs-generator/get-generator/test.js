var assert = require('assert');
var getGenerator = require('..');

function test(generator) {
  var iterator = generator();
  assert(iterator.next().value == 1);
  assert(iterator.next().done);

  for (var o of generator())
    assert(o == 1)
}

test(getGenerator([1]));
test(getGenerator(function* () { yield 1; }));
