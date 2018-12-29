'use strict';

var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var assert = require('@kingjs/assert');

function createConstructor(name, base, body) {
  assert(is.string(name));
  assert(!base || is.function(base));
  assert(!body || is.function(body));

  var constructor = function() {

    if (base)
      base.apply(this, arguments);

    if (body)
      body.apply(this, arguments);
  };
  
  objectEx.defineConstField(constructor, 'name', name);

  if (body && !body.name)
    objectEx.defineConstField(body, 'name', `${name} (ctor)`);

  if (base) {
    constructor.prototype = Object.create(base.prototype);
    objectEx.defineHiddenConstField(constructor.prototype, 'constructor', constructor);
  }
  
  return constructor;
}

Object.defineProperties(module, {
  exports: { value: createConstructor }
});