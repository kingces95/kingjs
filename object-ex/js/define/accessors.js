'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var defineProperty = require('./property');
var bindLazy = require('../bind-lazy');
var defineStatic = require('./static');
var bindThis = require('../bind-this');
var bindExternal = require('../bind-external-accessor');

function defineAccessor(target, name, descriptor) {
  var get = descriptor.get;
  var set = descriptor.set;

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
      get: get ? bindThis(get, target) : undefined,
      set: set ? bindThis(set, target) : undefined,
    });
  }

  assert(!(descriptor.lazy && descriptor.external))

  if (descriptor.external) {

    if (get)
      get = bindExternal(get, name, isEnumerable);

    if (set)
      set = bindExternal(set, name, isEnumerable);
  }

  if (descriptor.lazy)
    get = bindLazy(get, name, isEnumerable, isStatic, true);
    
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