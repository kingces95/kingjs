'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var Dictionary = require('@kingjs/Dictionary');
var takeLeft = require('@kingjs/func.return-arg-0');
var merge = require('@kingjs/descriptor.merge');
var emptyObject = require('@kingjs/empty-object');

function wrap(descriptor, wrap) {

  // declarative
  if (is.string(wrap)) {
    var dictionary = new Dictionary();
    dictionary[wrap] = descriptor;
    return dictionary;
  }

  // procedural
  if (is.function(wrap))
    return wrap(descriptor);

  assert(false, 'Bad wrap type.');
}

function create(descriptor, action) {

  if (is.undefined(descriptor))
    descriptor = new Dictionary();

  if (!action)
    action = emptyObject;

  // wrap
  if (!is.object(descriptor))
    descriptor = wrap(descriptor, action.wrap);

  // defaults
  if (action.defaults) {
    descriptor = merge.call(
      descriptor, 
      action.defaults,
      takeLeft
    );
  }
  
  Object.freeze(descriptor);

  return descriptor;
}

Object.defineProperties(module, {
  exports: { value: create }
});