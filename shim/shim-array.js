'use strict';

var IndexableEnumerable = require('./indexable-enumerable');

var { 
  Implement,
  IIterable,
  IEnumerable, IEnumerable: { 
    GetEnumerator,
  },
} = Symbol.kingjs;

Array[Implement](IIterable);
Array[Implement](IEnumerable, {
  GetEnumerator: function() {
    return new IndexableEnumerable(this);
  }
});