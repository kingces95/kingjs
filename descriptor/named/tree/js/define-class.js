'use strict';

var defineBase = require('./define-base');
var objectEx = require('@kingjs/object-ex');

function defineClass(target, name, baseFunc, init) {

  var func = function() {
    baseFunc.apply(this, arguments);
    init.apply(this, arguments);
  };
  defineBase(func, baseFunc);

  objectEx.defineConstField(func, 'name', name);
  objectEx.defineConstField(target, name, func);
  return func;
}

Object.defineProperties(module, {
  exports: { value: defineClass }
});