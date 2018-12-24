//'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var defineClass = require('../../../define-class');
var objectEx = require('@kingjs/object-ex');

var abstractTypeError = 'Cannot create abstract type.';

function load(func) {
  if (func)
    return func;

  func = defineFunc.call(this);
  defineVtable.call(this, func);
  defineFields.call(this, func);

  return func;
}

function defineFunc() {

  var loader = this.loader;
  var infoSym = loader.infoSymbol;

  // load baseFunc
  assert(this.base);
  var baseFunc = this.base.func;

  // init; prevent activation if abstract
  var init = this.init;
  if (this.isAbstract) {
    init = function() {
      var info = this[infoSym];
      assert(!info.isAbstract, abstractTypeError); 
    }
  }

  // create this function using base function
  var name = this.name;
  var func = defineClass(name, baseFunc, init);

  // allow func -> info resolution
  objectEx.defineHiddenStaticField(func, infoSym, this);

  return func;
}

function defineVtable(func) {
  var prototype = func.prototype;

  var vtable = this.vtable;
  var slots = Object.getOwnPropertyNames(vtable);
  slots = slots.concat(Object.getOwnPropertySymbols(vtable))

  for (var slot of slots) {
    var member = vtable[slot];

    var descriptor = {
      enumerable: member.isEnumerable,
      external: member.isExternal,
      static: member.isStatic,
      function: member.isMethod,
    };

    if (member.isMethod) {
      descriptor.value = member.func;
    } 
    else {
      assert(member.isAccessor);
      descriptor.get = member.get;
      descriptor.set = member.set;
    }

    var target = member.isStatic ? func : prototype;
    objectEx.defineProperty(target, slot, descriptor);
  }
}

function defineFields(func) {
}

Object.defineProperties(module, {
  exports: { value: load }
});