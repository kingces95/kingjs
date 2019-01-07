'use strict';

var DefineInterfaceOn = require('./define-interface-on');
var IndexableEnumerable = require('./indexable-enumerable');

var { 
  IIterable,
  IEnumerable
} = Symbol.kingjs;

IIterable[DefineInterfaceOn](Array.prototype);
IEnumerable[DefineInterfaceOn](Array.prototype, {
  GetEnumerator: function() {
    return new IndexableEnumerable(this);
  }
});