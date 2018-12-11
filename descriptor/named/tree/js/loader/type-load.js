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

  // load children
  for (var name in this.children) {
    var child = this.children[name];
    if (child.isMethod)
      loadMethod.call(child);
  }

  return func;
}

Object.defineProperties(module, {
  exports: { value: load }
});