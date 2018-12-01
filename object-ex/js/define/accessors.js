'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var defineProperty = require('./property');
var defineStatic = require('./static');
var stubLazy = require('../stub/lazy');
var stubExternal = require('../stub/external');
var bindThunkGetter = require('../thunk/getter');
var bindThunkSetter = require('../thunk/setter');

function defineAccessor(target, name, descriptor) {
  var get = descriptor.get;
  var set = descriptor.set;

  var isAccessor = true;
  var isStatic = descriptor.static;
  var isEnumerable = descriptor.enumerable;

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

  if (descriptor.external) {

    if (get)
      get = stubExternal(get, name, isStatic, isEnumerable, isAccessor);

    if (set)
      set = stubExternal(set, name, isStatic, isEnumerable, isAccessor);
  }

  if (descriptor.lazy) {
    assert(!set);
    get = stubLazy(get, name, isStatic, isEnumerable, isAccessor);
  }
    
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