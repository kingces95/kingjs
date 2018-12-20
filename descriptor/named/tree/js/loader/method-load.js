//'use strict';

var assert = require('@kingjs/assert');
var objectEx = require('@kingjs/object-ex');
var is = require('@kingjs/is');

var missingOverrideError = 'Method override not found.';
var abstractMethodScopeError = 'Abstract method declared on non-abstract scope.';
var abstractMethodImplError = 'Abstract method declared with implementation.';
var abstractStaticMethodError = 'Abstract methods cannot be static.';

function load() {
  var scope = this.scope;
  assert(scope.isType);

  var target = scope.func;
  if (!this.isStatic && !scope.isInterface)
    target = target.prototype;
  assert(target); 

  var name = this.name;
  var func = this.func;
  if (target.hasOwnProperty(name)) {
    assert(func == target[name]);
    return func;
  }

  if (this.isAbstract) {
    assert(!func, abstractMethodImplError);
    assert(this.scope.isAbstract, abstractMethodScopeError);
    assert(!this.isStatic, abstractStaticMethodError)

    if (scope.isInterface)
      func = createInterfaceThunk(this);
    else if (this.declaringInterface)
      func = this.declaringInterface.load();
    else
      func = function() { return this[name].apply(this, arguments); }
  }

  assert(is.function(func) || is.string(func));

  objectEx.defineFunction(target, this.name, func);
  return func;
}

function createInterfaceThunk(method) {
  var thunk = function() {
    var override;

    var scope = method.scope;
    var Type = scope.load();
    assert(this instanceof Type);
    
    // explicit interface implementation
    if (scope.isInterface)
      override = this[method.id];

    // implicit interface or abstract method implementation
    if (!override)
      override = this[method.name];

    assert(is.function(override), missingOverrideError);
    return override.apply(this, arguments);
  }

  Object.defineProperty(thunk, 'name', {
    value: method.name + 'Thunk'
  });

  return thunk;
}

Object.defineProperties(module, {
  exports: { value: load }
});