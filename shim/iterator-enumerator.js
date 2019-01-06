'use strict';
var assert = require('assert');

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

module.exports = createMoveNext;