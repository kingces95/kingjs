'use strict';

var orderBy = require('@kingjs/linq.order-by');

function orderByDescending(keySelector, lessThan) {
  return orderBy.call(this, keySelector, lessThan, true);
}

Object.defineProperties(module, {
  exports: { value: orderByDescending }
});