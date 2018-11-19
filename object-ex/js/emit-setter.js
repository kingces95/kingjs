'use strict';

function emitSetter(x) {
  return new Function('value', x + ';');
}

Object.defineProperties(module, {
  exports: { value: emitSetter }
});