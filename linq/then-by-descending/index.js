'use strict';

function thenByDescending(keySelector, lessThan) {
  return this.createOrderedEnumerable(keySelector, lessThan, true);
}

Object.defineProperties(module, {
  exports: { value: thenByDescending }
});