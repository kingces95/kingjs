'use strict';

var { 
  DefineExtension,
  IEnumerable,
  IEnumerable: { GetEnumerator },
  IEnumerator: { MoveNext, Current }
} = Symbol[Symbol.for('@kingjs')];

function all(predicate) {    
  var enumerator = this[GetEnumerator]();
  while (enumerator[MoveNext]()) {
    if (predicate && !predicate(enumerator[Current]))
      return false;
  }
  
  return true;
}

Object.defineProperties(module, {
  exports: { value: IEnumerable[DefineExtension]('all', all) }
});