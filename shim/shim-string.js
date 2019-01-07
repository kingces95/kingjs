'use strict';

var { 
  DefineInterfaceOn,
  IIterable,
  IEnumerable, IEnumerable: { 
    GetEnumerator,
  },
} = Symbol.kingjs;

IIterable[DefineInterfaceOn](String.prototype);
IEnumerable[DefineInterfaceOn](String.prototype, {
  GetEnumerator: function() {
    return new IndexableEnumerable(this);
  }
});