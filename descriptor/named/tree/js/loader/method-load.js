//'use strict';

var assert = require('@kingjs/assert');
var objectEx = require('@kingjs/object-ex');
var is = require('@kingjs/is');

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

    func = function() { 
      return this[name].apply(this, arguments); 
    }

    objectEx.defineHiddenField(
      func, 'name', `${this.fullName} (thunk)`
    );
  }

  assert(is.function(func) || is.string(func));

  this.func = func;
  objectEx.defineFunction(target, this.name, func);
  return func;
}

Object.defineProperties(module, {
  exports: { value: load }
});