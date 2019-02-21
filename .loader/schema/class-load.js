//'use strict';

var is = require('@kingjs/is');
var assert = require('assert');
var objectEx = require('@kingjs/object-ex');
var createCtor = require('@kingjs/create-constructor');

var abstractTypeError = 'Cannot create abstract type.';

function load(init) {
  var func = this.isNative ? init : defineFunc.call(this, init);

  // allow func -> info resolution
  objectEx.defineHiddenStaticField(func, this.info, this);

  defineVtable.call(this, func);
  defineFields.call(this, func);

  return func;
}

function defineFunc(init) {
  var info = this.info;

  // load baseFunc
  assert(this.base);
  var baseFunc = this.base.load();

  // init; prevent activation if abstract
  if (this.isAbstract) {
    init = function() {info
      var self = this[info];
      assert(!self.isAbstract, abstractTypeError); 
    }
  }

  // create this function using base function
  return createCtor(this.name, baseFunc, init);
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
      descriptor.value = member.load();
    } 
    else {
      assert(member.isAccessor);
      if (member.get)
        descriptor.get = member.get.load();
      if (member.set)
        descriptor.set = member.set.load();
    }

    var target = member.isStatic ? func : prototype;
    objectEx.defineProperty(target, slot, descriptor);
  }
}

function defineFields(func) {

  for (var name in this.children) {
    var member = this.children[name];
    if (!member.isField)
      continue;

    var descriptor = {
      enumerable: member.isEnumerable,
      static: member.isStatic,
    };

    assert((member.isReadOnly && member.isConst) == false);

    if (member.isReadOnly) {
      descriptor.future = true;
      descriptor.writeOnce = true;
    }
    else {
      descriptor.writable = !member.isConst;
      descriptor.value = member.value
    }
    
    var target = member.isStatic ? func : func.prototype;
    objectEx.defineProperty(target, name, descriptor);
  }
}

Object.defineProperties(module, {
  exports: { value: load }
});