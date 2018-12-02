'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var defineThunkToStatic = require('./static');
var lazy = require('../lazy');

function defineAccessor(target, name, descriptor) {
  var get = descriptor.get;
  var set = descriptor.set;

  var isAccessor = true;
  var isGetter = true;
  var isStatic = descriptor.static;
  var isEnumerable = descriptor.enumerable;

  if (is.string(get))
    get = new Function('return ' + get + ';');

  if (is.string(set))
    set = new Function('value', set + ';');

  if (isStatic) {
    assert(!descriptor.configurable);
    defineThunkToStatic(target, name, isEnumerable, isAccessor);
  }

  if (descriptor.external) {
    var isStub = true;

    if (get)
      get = lazy(get, name, isStatic, isStub, isEnumerable, isAccessor, isGetter);

    if (set)
      set = lazy(set, name, isStatic, isStub, isEnumerable, isAccessor, !isGetter);
  }

  if (descriptor.lazy) {
    assert(!set);
    var isStub = false;
    get = lazy(get, name, isStatic, isStub, isEnumerable, isAccessor, isGetter);
  }
    
  if (get)
    descriptor.get = get;

  if (set)
    descriptor.set = set;
  
  Object.defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineAccessor }
});