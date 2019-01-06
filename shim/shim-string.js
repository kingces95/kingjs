'use strict';

var { 
  AddPolymorphism,
  IIterable,
  IEnumerable,
  IEnumerable: { GetEnumerator }
} = Symbol.kingjs;

String.prototype[GetEnumerator] = function() {
  return new IndexableEnumerable(this);
}

String[AddPolymorphism](IIterable);
String[AddPolymorphism](IEnumerable);