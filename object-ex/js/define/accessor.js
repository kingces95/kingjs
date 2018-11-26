'use strict';

var defineProperty = require('./property');
var bindLazy = require('../bind-lazy');
var bindThis = require('../bind-this');

function defineAccessor(target, name, descriptor) {
  var get = descriptor.get;
  var set = descriptor.set;
  var thisArg = descriptor.thisArg;

  if (is.string(get))
    get = new Function('return ' + get + ';');

  if (is.string(set))
    set = new Function('value', set + ';');

  if (thisArg) {

    if (get)
      get = bindThis(get, thisArg);

    if (set)
      set = bindThis(set, thisArg);
  }

  if (descriptor.lazy)
    get = bindLazy.call(get, name, descriptor.enumerable);
    
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