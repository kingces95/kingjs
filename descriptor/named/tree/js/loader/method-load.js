//'use strict';

var assert = require('@kingjs/assert');
var objectEx = require('@kingjs/object-ex');
var is = require('@kingjs/is');

var missingOverrideError = 'Method override not found.';
var abstractMethodScopeError = 'Abstract method declared on non-abstract scope.';
var abstractMethodImplError = 'Abstract method declared with implementation.';
var abstractStaticMethodError = 'Abstract methods cannot be static.';

function abstractMethod() {
  throw 'Abstract method has no override.';
}

function load() {
  var scope = this.scope;
  assert(scope.isType);

  var func = this.func;
  if (func)
    return func;

  if (this.isAbstract) {
    assert(!func, abstractMethodImplError);
    assert(this.scope.isAbstract, abstractMethodScopeError);
    assert(!this.isStatic, abstractStaticMethodError)

    func = abstractMethod;
    if (scope.isInterface)
      func = createInterfaceThunk(this);
    else if (this.declaringInterface)
      func = this.declaringInterface.load();
  }

  assert(is.function(func) || is.string(func));

  var target = scope.func;
  assert(target); 

  if (!this.isStatic)
    target = target.prototype;

  objectEx.defineFunction(target, this.name, {
    value: func
  });
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