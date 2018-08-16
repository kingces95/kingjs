'use strict';

function forEach(action, enumerable) {
  var i = 0;
  var enumerator = enumerable.getEnumerator();
  while (enumerator.moveNext())
    action.call(this, enumerator.current, i++);
};

Object.defineProperties(module, {
  exports: { value: forEach }
});