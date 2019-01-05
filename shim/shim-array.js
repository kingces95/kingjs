'use strict';

var IndexableEnumerable = require('./indexable-enumerable');

var { 
  IEnumerable,
  IEnumerable: { GetEnumerator },
  IIterable,
  AddPolymorphism,
} = Symbol[Symbol.for('@kingjs')];

Array.prototype[GetEnumerator] = function() {
  return new IndexableEnumerable(this);
}

Array[AddPolymorphism](IIterable);
Array[AddPolymorphism](IEnumerable);