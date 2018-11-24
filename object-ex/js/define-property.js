'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var emitGetter = require('./emit-getter');
var emitSetter = require('./emit-setter');
var bindLazyDefineConstField = require('./lazy-define-const-field');

function defineProperty(target, name, descriptor) {

  if ('get' in descriptor || 'set' in descriptor)
    defineAccessor(name, descriptor);

  if ('func' in descriptor)
    defineFunction(name, descriptor);

  if (target)
    Object.defineProperty(target, name, descriptor);

  return descriptor;
}

function defineAccessor(name, descriptor) {

  var get = descriptor.get;
  if (get) {
    if (is.string(get))
      get = emitGetter(get);

    if (descriptor.lazy) 
      get = bindLazyDefineConstField(name, get);
    
    descriptor.get = get;
  }

  var set = descriptor.set;
  if (is.string(set))
    descriptor.set = emitSetter(set);

  assert(descriptor.get || descriptor.set);
  assert(!descriptor.get || is.function(descriptor.get));
  assert(!descriptor.set || is.function(descriptor.set));

  return descriptor;
}

function defineFunction(name, descriptor) {

  var func = descriptor.func;
  delete descriptor.func;

  if (is.string(func))
    func = emitGetter(func);

  if (descriptor.lazy) 
    func = bindLazyDefineConstField(name, func);

  descriptor.value = func;

  return descriptor;
}

Object.defineProperties(module, {
  exports: { value: defineProperty }
});