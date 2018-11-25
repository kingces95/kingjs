'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var Dictionary = require('@kingjs/Dictionary');
var takeLeft = require('@kingjs/func.return-arg-0');
var merge = require('@kingjs/descriptor.merge');

function wrap(descriptor, action, thisArg) {

  var wrap = is.object(action) ? action.wrap : action;

  // declarative
  if (is.string(wrap)) {
    var dictionary = new Dictionary();
    dictionary[wrap] = descriptor;
    return dictionary;
  }

  // procedural
  if (is.function(wrap))
    return wrap.call(thisArg, descriptor);

  assert(false, 'Unable to create descriptor.');
}

function create(descriptor, action, thisArg) {

  if (is.undefined(descriptor))
    descriptor = new Dictionary();

  // wrap
  if (!is.object(descriptor))
    descriptor = wrap(descriptor, action, thisArg);

  // defaults
  if (is.object(action) && action.defaults) {
    descriptor = merge.call(
      descriptor, 
      action.defaults,
      takeLeft,
      thisArg
    );
  }
  
  Object.freeze(descriptor);

  return descriptor;
}

Object.defineProperties(module, {
  exports: { value: create }
});