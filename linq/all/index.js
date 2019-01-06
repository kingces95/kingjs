'use strict';

var { 
  DefineExtension,
  IEnumerable,
  IEnumerable: { GetEnumerator },
  IEnumerator: { MoveNext, Current }
} = Symbol.kingjs;

function all(predicate) {    
  var enumerator = this[GetEnumerator]();
  while (enumerator[MoveNext]()) {
    if (predicate && !predicate(enumerator[Current]))
      return false;
  }
  
  return true;
}

module.exports = IEnumerable[DefineExtension](all);