'use strict';

var objectEx = require('@kingjs/object-ex');

var attrSym = Symbol.for('@kingjs/attribute');

function getBase() {
  var ctor = this;

  var prototype = ctor.prototype;
  if (!prototype)
    return null;

  var basePrototype = Object.getPrototypeOf(prototype);
  if (!basePrototype)
    return null;

  var baseCtor = basePrototype.constructor;
  if (!baseCtor)
    return null;

  return baseCtor;
}

objectEx.defineLazyAccessor(
  Function.prototype, 
  attrSym, 
  function() {
    var baseCtor = getBase.call(this);

    var baseAttr = null;
    if (baseCtor)
      baseAttr = baseCtor[attrSym];

    var result = Object.create(baseAttr);
    result.constructor = this;
    result.prototype = baseAttr;
    return result;
  }
);

Object.defineProperties(module, {
  exports: { value: attrSym }
});