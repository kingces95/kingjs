'use strict';

var { 
  Implement,
  IIterable,
  IEnumerable, IEnumerable: { 
    GetEnumerator,
  },
} = Symbol.kingjs;

String[Implement](IIterable);
String[Implement](IEnumerable, {
  GetEnumerator: function() {
    return new IndexableEnumerable(this);
  }
});