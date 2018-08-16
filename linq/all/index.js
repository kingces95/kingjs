'use strict';

function all(predicate) {    
  var enumerator = this.getEnumerator();
  while (enumerator.moveNext()) {
    if (predicate && !predicate(enumerator.current))
      return false;
  }
  
  return true;
}

Object.defineProperties(module, {
  exports: { value: all }
});
