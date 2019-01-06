'use strict';
var assert = require('assert');

require('../index');

var {
  IEnumerable,
  IEnumerator,
  IIterable: { GetIterator },
  IEnumerable: { GetEnumerator },
  IEnumerator: { MoveNext, Current },
} = Symbol.kingjs;

function testGeneratorEnumerableShim() {
  {
    function* range3() {
      yield 0;
      yield 1;
      yield 2;
    };

    var test = range(3);
    var x = test[GetIterator]();
    var next0 = x.next();
    var next1 = x.next();
    var next2 = x.next();
    var next3 = x.next();
  }

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
testGeneratorEnumerableShim();