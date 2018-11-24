'use strict';

var assert = require('@kingjs/assert');
var defineClass = require('../define-class');
var objectEx = require('@kingjs/object-ex');

function load() {
  if (this.isClass)
    return loadClass.call(this);

  if (this.isInterface)
    return loadInterface.call(this);

  assert('Unable to load type: ' + this.fullName);
}

function loadClass() {
  if (this.func)
    return this.func;

  var base = this.base;
  var baseFunc = base.load();

  var name = this.name;
  var func = defineClass(name, baseFunc, this.init);
  objectEx.defineConstField(this, name, func);
  return func;
}

function loadInterface() { }

Object.defineProperties(module, {
  exports: { value: load }
});