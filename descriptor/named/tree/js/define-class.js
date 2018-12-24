'use strict';

var defineBase = require('./define-base');
var objectEx = require('@kingjs/object-ex');

function defineClass(name, baseFunc, init) {

  var func = function() {
    if (baseFunc)
      baseFunc.apply(this, arguments);

    if (init)
      init.apply(this, arguments);
  };

  defineBase(func, baseFunc);

  objectEx.defineConstField(func, 'name', name);
  
  return func;
}

Object.defineProperties(module, {
  exports: { value: defineClass }
});