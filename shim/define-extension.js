'use strict';

var assert = require('assert')

var {
  '@kingjs/define-interface': defineInterface,
  '@kingjs/object-ex': objectEx,
} = require('@kingjs/require-packages').call(module);

var {
  Identity,
  IInterface,
} = defineInterface;

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

module.exports = defineExtension