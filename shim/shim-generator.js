'use strict';

var {
  '@kingjs/generator': Generator,
} = require('@kingjs/require-packages').call(module);

var DefineInterfaceOn = require('./define-interface-on');
var defineIEnumerableOn = require('./define-ienumerable-on');

var { 
  IIterable, 
  IIterable: { 
    GetIterator,
  }
} = Symbol.kingjs;

IIterable[DefineInterfaceOn](Generator.prototype, {
  GetIterator: function getIterator() { return this(); }
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