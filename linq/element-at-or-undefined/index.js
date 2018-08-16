'use strict';

function elementAtOrDefault(index) {
  if (index < 0)
    throw "elementAt: index < 0"

  var enumerator = this.getEnumerator();
  
  var current = 0;

  while (enumerator.moveNext()) {
    if (current++ == index)
      return enumerator.current;
  }
};

Object.defineProperties(module, {
  exports: { value: elementAtOrDefault }
});