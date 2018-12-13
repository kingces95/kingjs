//'use strict';

var assert = require('@kingjs/assert');
var objectEx = require('@kingjs/object-ex');
var is = require('@kingjs/is');

function load() {
  var scope = this.scope;
  assert(scope.isType);

  var name = this.name;

  var target = scope.func;
  assert(target); 
  if (!this.isStatic)
    target = target.prototype;
  
  var func = this.func;
  if (this.isAbstract) {
    var override = scope.isInterface ? this.id : name;
    func = function() {
      var newFunc = this[override];
      assert(newFunc != func);
      return newFunc.apply(this, arguments);
    }
  }
  assert(is.function(func) || is.string(func));

  var descriptor = {
    value: func
  }

  objectEx.defineFunction(target, name, descriptor);
}

Object.defineProperties(module, {
  exports: { value: load }
});