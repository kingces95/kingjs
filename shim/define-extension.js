'use strict';

var assert = require('assert')

var {
  '@kingjs/object-ex': objectEx,
} = require('@kingjs/require-packages').call(module);

var KingJs = Symbol[Symbol.for('@kingjs')]

var {
  Identity,
  IPolymorphic,
  IInterface
} = KingJs;

function defineExtension(name, extension) {
  assert(this instanceof IInterface);
  assert(extension instanceof Function);

  objectEx.defineField(extension, 'name', name);

  assert(!(Identity in extension));
  var id = extension[Identity] = Symbol(name);

  var descriptor = {
    extends: () => this,
    value: extension
  };

  objectEx.defineFunction(Object.prototype, id, descriptor);

  return id;
}

// extend IPolymorphic with defineExtension
var DefineExtension = defineExtension.call(
  IPolymorphic,
  defineExtension.name,
  defineExtension
);

// shim
KingJs.DefineExtension = DefineExtension;