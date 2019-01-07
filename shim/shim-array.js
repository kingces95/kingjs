'use strict';

var IndexableEnumerable = require('./indexable-enumerable');

var { 
  DefineInterfaceOn,
  IIterable,
  IEnumerable, IEnumerable: { 
    GetEnumerator,
  },
} = Symbol.kingjs;

IIterable[DefineInterfaceOn](Array.prototype);
IEnumerable[DefineInterfaceOn](Array.prototype, {
  GetEnumerator: function() {
    return new IndexableEnumerable(this);
  }
});