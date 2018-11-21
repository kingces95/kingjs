'use strict';

var objectEx = require('@kingjs/object-ex');

var attributeSym = Symbol.for('@kingjs/attribute');

objectEx.defineLazyAccessor(
  Function.prototype, 
  attributeSym,
  '{ }'
);

Object.defineProperties(module, {
  exports: { value: attributeSym }
});