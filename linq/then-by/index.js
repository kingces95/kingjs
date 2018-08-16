'use strict';

function thenBy(keySelector, lessThan) {
  return this.createOrderedEnumerable(keySelector, lessThan, false);
}

Object.defineProperties(module, {
  exports: { value: thenBy }
});