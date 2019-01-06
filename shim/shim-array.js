'use strict';

var IndexableEnumerable = require('./indexable-enumerable');

var { 
  IEnumerable,
  IEnumerable: { GetEnumerator },
  IIterable,
  AddPolymorphism,
} = Symbol.kingjs;

Array.prototype[GetEnumerator] = function() {
  return new IndexableEnumerable(this);
}

Array[AddPolymorphism](IIterable);
Array[AddPolymorphism](IEnumerable);