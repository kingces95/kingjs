//'use strict';

var assert = require('@kingjs/assert');
var defineClass = require('../define-class');
var objectEx = require('@kingjs/object-ex');

function load() {

  if (this.func)
    return this.func;

  // load base
  var base = this.base;
  var baseFunc = base.load();

  // create this function using base function
  var name = this.name;
  var func = defineClass(name, baseFunc, this.init);
  objectEx.defineConstField(this, name, func);

  return func;
}

Object.defineProperties(module, {
  exports: { value: load }
});