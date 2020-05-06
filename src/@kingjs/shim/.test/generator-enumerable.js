var assert = require('assert');

require('..');

var {
  '@kingjs': {
    IEnumerable,
    IEnumerator,
    IIterable: { GetIterator },
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
  }
} = module[require('@kingjs-module/dependencies')]();


function testGeneratorEnumerableShim() {
  function* range3() {
    yield 0;
    yield 1;
    yield 2;
  };

  assert(range3 instanceof IEnumerable);
  var enumerator = range3[GetEnumerator]();
  assert(enumerator instanceof IEnumerator);

  var i = 0;
  while (enumerator[MoveNext]())
    assert(enumerator[Current] == i++);
  assert(i == 3);
}
testGeneratorEnumerableShim();

function testBindGeneratorEnumerableShim() {
  
  function* range(count) {
    for (var i = 0; i < count; i++)
      yield i;
  }

  assert(range instanceof IEnumerable);

  var count = 3;
  var generator = range.bind(null, count);
  var enumerator = generator[GetEnumerator]();

  assert(enumerator instanceof IEnumerator);

  var i = 0;
  while (enumerator[MoveNext]())
    assert(enumerator[Current] == i++);
  assert(i == count);
}
testBindGeneratorEnumerableShim();