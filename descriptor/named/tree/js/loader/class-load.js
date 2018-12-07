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

  // load all extension methods
  while (this.loader.unloadedExtensionMethods.length)
    this.loader.unloadedExtensionMethods.pop().load();

  // register with interfaces and receive extension methods
  var implements = this.implements;
  if (implements) {
    for (var i = 0; i < implements.length; i++)
      implements[i].track(this);
  }

  return func;
}

Object.defineProperties(module, {
  exports: { value: load }
});