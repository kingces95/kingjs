'use strict';

function any(predicate) {    
  var enumerator = this.getEnumerator();
  while (enumerator.moveNext()) {
    if (!predicate || predicate(enumerator.current))
      return true;
  }
  
  return false;
};

Object.defineProperties(module, {
  exports: { value: any }
});
