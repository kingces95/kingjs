//'use strict';

var assert = require('@kingjs/assert');
var loadMethod = require('./method-load');
var defineClass = require('../define-class');
var objectEx = require('@kingjs/object-ex');

var abstractTypeError = 'Cannot create abstract type.';

function load() {

  if (this.func)
    return this.func;

  var func = createFunc.call(this);

  objectEx.defineConstField(this, 'func', func);

  overrideInstanceOf.call(this);

  defineChildren.call(this);

  defineInterfaceThunks.call(this);

  return func;
}

function createFunc() {

  var loader = this.loader;
  var infoSym = loader.infoSymbol;

  // load base
  var base = this.base;
  var baseFunc = base ? base.load() : null;

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

function overrideInstanceOf() {
  if (this.isClass)
    return;

  // augment instanceof (e.g. account for interfaces)
  Object.defineProperty(this.func, Symbol.hasInstance, {
    value: instance => this.hasInstance(instance)
  })
}

function defineChildren() {
  var childNames = Object.getOwnPropertyNames(this.children);
  var childSymbols = Object.getOwnPropertySymbols(this.children);
  for (var name of childNames.concat(childSymbols)) {
    var child = this.children[name];
    if (child.isMethod)
      loadMethod.call(child);
  }
}

function defineInterfaceThunks() {
  if (this.isInterface)
    return;

  var loader = this.loader;
  var func = this.func;
  var prototype = func.prototype;

  // add thunks from interface methods to implicit implementations

  // enumerate interfaces added beyond those included in base polymorphisms
  var ownVtableIds = Object.getOwnPropertySymbols(this.vtable);
  for (var id of ownVtableIds) {

    // take only the interfaces
    var interface = loader.resolve(id);
    if (!interface.isInterface)
      continue;

    // take only functions and accessors
    for (var name in interface.children) {
      var member = interface.children[name];
      if (!member.isProcedural)
        continue;
      
      // skip if explicitly implemented
      var id = member.id;
      if (id in prototype)
        continue;

      // add implicit interface implementation
      objectEx.defineProperty(prototype, id, 
        member.isMethod ? {
          enumerable: member.isEnumerable,
          function: true,
          value: member.func
        } : {
          enumerable: member.isEnumerable,
          get: member.get,
          set: member.set
        }
      );
    }
  }
}

Object.defineProperties(module, {
  exports: { value: load }
});