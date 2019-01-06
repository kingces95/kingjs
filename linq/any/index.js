'use strict';

var { 
  DefineExtension,
  IEnumerable,
  IEnumerable: { GetEnumerator },
  IEnumerator: { MoveNext, Current }
} = Symbol.kingjs;

function any(predicate) {    
  var enumerator = this[GetEnumerator]();
  while (enumerator[MoveNext]()) {
    if (!predicate || predicate(enumerator[Current]))
      return true;
  }
  
  return false;
};

module.exports = IEnumerable[DefineExtension](any);