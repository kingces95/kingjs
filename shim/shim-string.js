'use strict';

var {
  '@kingjs/implement-interface': implementInterface,
} = require('@kingjs/require-packages').call(module);

var IndexableEnumerable = require('./indexable-enumerable');

var { 
  IIterable,
  IEnumerable
} = Symbol.kingjs;

implementInterface(String.prototype, IIterable);
implementInterface(String.prototype, IEnumerable, {
  getEnumerator: {
    value: function() { return new IndexableEnumerable(this); }
  }
});