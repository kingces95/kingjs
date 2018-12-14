//'use strict';

var assert = require('@kingjs/assert');
var loadMethod = require('./method-load');
var defineClass = require('../define-class');
var objectEx = require('@kingjs/object-ex');

var abstractTypeError = 'Cannot create abstract type.';

function load() {

  if (this.func)
    return this.func;

  // load base
  var base = this.base;
  var baseFunc = base.load();

  // init; prevent activation if abstract
  var init = this.init;
  if (this.isAbstract)
    init = () => { throw abstractTypeError }

  // create this function using base function
  var name = this.name;
  var func = defineClass(name, baseFunc, init);
  objectEx.defineConstField(this, 'func', func);

  // allow func -> info resolution
  console.log(name);
  objectEx.defineHiddenField(func, this.loader.infoSymbol, this);

  // augment instanceof (e.g. account for interfaces)
  Object.defineProperty(
    func,
    Symbol.hasInstance, {
      value: instance => this.hasInstance(instance)
    }
  )

  // load children
  var childNames = Object.getOwnPropertyNames(this.children);
  var childSymbols = Object.getOwnPropertySymbols(this.children);
  for (var name of childNames.concat(childSymbols)) {
    var child = this.children[name];
    if (child.isMethod)
      loadMethod.call(child);
  }

  return func;
}

Object.defineProperties(module, {
  exports: { value: load }
});