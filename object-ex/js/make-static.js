'use strict';

var is = require('@kingjs/is');

var map = {
  value: null,
  get: null,
  set: null
}

function bindCtor(func, ctor) {
  return function() {
    return func.apply(ctor, arguments);
  }
}

function makeStatic(ctor) {

  for (var name in map) {
    var func = this[name];
    if (!func)
      continue;

    this[name] = bindCtor(func, ctor);
  }

  return this;
}

Object.defineProperties(module, {
  exports: { value: makeStatic }
});