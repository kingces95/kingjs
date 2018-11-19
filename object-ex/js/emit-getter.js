'use strict';

function emitGetter(x) {
  return new Function('return ' + x + ';');
}

Object.defineProperties(module, {
  exports: { value: emitGetter }
});