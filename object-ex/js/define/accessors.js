'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var defineProperty = require('./property');
var bindLazy = require('../bind-lazy');
var defineStatic = require('./static');
var bindThis = require('../bind-this');

function defineAccessor(target, name, descriptor) {
  var get = descriptor.get;
  var set = descriptor.set;
  var isEnumerable = descriptor.enumerable;

  if (is.string(get))
    get = new Function('return ' + get + ';');

  if (is.string(set))
    set = new Function('value', set + ';');

  if (descriptor.static) {
    assert(!descriptor.configurable);
    defineStatic(target, name, {
      enumerable: isEnumerable,
      get: get ? bindThis(get, target) : undefined,
      set: set ? bindThis(set, target) : undefined,
    });
  }

  if (descriptor.lazy)
    get = bindLazy(get, name, descriptor.enumerable);
    
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