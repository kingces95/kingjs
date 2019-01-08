'use strict';

var {
  '@kingjs/generator': Generator,
  '@kingjs/implement-interface': implementInterface,
} = require('@kingjs/require-packages').call(module);

var defineIEnumerableOn = require('./define-ienumerable-on');

var { 
  IIterable, 
  IIterable: { 
    GetIterator,
  }
} = Symbol.kingjs;

implementInterface(Generator.prototype, IIterable, {
  getIterator: { value: function getIterator() { return this(); } }
});

defineIEnumerableOn(Generator.prototype, 
  function createMoveNext() {
    var generator = this;
    var iterator = null;

    return function moveNext() {
      if (!iterator) {
        var iterable = generator();
        iterator = iterable[GetIterator]();
      }
      var next = iterator.next();
      this.current_ = next.value;
      return !next.done;
    };
  }
)