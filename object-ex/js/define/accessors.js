'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var defineProperty = require('./property');
var stubLazy = require('../stub/lazy');
var bindLazy = require('../bind/lazy');
var defineStatic = require('./static');
var stubExternal = require('../stub/external-accessor');
var bindThunkGetter = require('../thunk/getter');
var bindThunkSetter = require('../thunk/setter');

function defineAccessor(target, name, descriptor) {
  var get = descriptor.get;
  var set = descriptor.set;

  var isStatic = descriptor.static;
  var isEnumerable = descriptor.enumerable;
  var isAccessor = true;

  if (is.string(get))
    get = new Function('return ' + get + ';');

  if (is.string(set))
    set = new Function('value', set + ';');

  if (isStatic) {
    assert(!descriptor.configurable);
    defineStatic(target, name, {
      enumerable: isEnumerable,
      get: get ? bindThunkGetter(target, name) : undefined,
      set: set ? bindThunkSetter(target, name) : undefined,
    });
  }

  assert(!(descriptor.lazy && descriptor.external))

  if (descriptor.external) {

    if (get)
      get = stubExternal(get, name, isEnumerable);

    if (set)
      set = stubExternal(set, name, isEnumerable);
  }

  if (descriptor.lazy)
    get = isStatic ? bindLazy(get) : stubLazy(get, name, isEnumerable, isAccessor);
    
  if (get)
    descriptor.get = get;

  if (set)
    descriptor.set = set;
  
  defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineAccessor }
});