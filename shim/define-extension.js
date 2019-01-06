'use strict';

var assert = require('assert')

var {
  '@kingjs/object-ex': objectEx,
} = require('@kingjs/require-packages').call(module);

var {
  Identity,
  IPolymorphic,
  IInterface
} = Symbol.kingjs;

function defineExtension(extension) {
  assert(this instanceof IInterface);
  assert(extension instanceof Function);

  var id = extension[Identity];
  if (!id)
    id = extension[Identity] = Symbol(extension.name);

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
  defineExtension
);

// shim
Symbol.kingjs.DefineExtension = DefineExtension;