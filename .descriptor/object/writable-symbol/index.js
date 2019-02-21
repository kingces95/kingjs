'use strict';

var writableSymbol = Symbol.for('@kingjs/descriptor.writable-symbol');

Object.defineProperties(module, {
  exports: { value: writableSymbol }
});