'use strict';
var assert = require('assert');

require('../index');

function readMe() {
  
  var {
    IIterable,
    IIterable: { GetIterator },
    DefineExtension
  } = Symbol.kingjs;

  var repeat = function* (i) {
    yield i;
    yield i;
    yield i;
  };
  var array = [0, 1, 2];
  var string = '012';

  var boundRepeat = repeat.bind(null, 1);
  assert(boundRepeat instanceof IIterable);
  assert(repeat instanceof IIterable);
  assert(array instanceof IIterable);
  assert(string instanceof IIterable);

  // demonstrate interop! Use Symbol.iterator implementation via IIterable
  var countId = IIterable[DefineExtension](function count() {
    var iterator = this[GetIterator]();
    var result = 0;

    var next;
    while (next = iterator.next(), !next.done)
      result++;

    return result;
  });

  assert(repeat[countId]() == 3);
  assert(string[countId]() == 3);
  assert(array[countId]() == 3);

  // check stub throws if instance is not IIterable
  assert.throws(() => ({})[countId]());
}
readMe();
