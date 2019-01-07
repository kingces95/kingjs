'use strict';

var assert = require('assert')

var {
  '@kingjs/define-interface': defineInterface,
  '@kingjs/object-ex': objectEx,
} = require('@kingjs/require-packages').call(module);

var {
  IInterface: { Id }
} = defineInterface;

function defineExtension(extension) {
  assert(this instanceof Function);
  assert(extension instanceof Function);

  var extensionId = extension[Id];
  if (!extensionId)
    extensionId = extension[Id] = Symbol(extension.name);

  objectEx.defineFunction(
    Object.prototype, 
    extensionId, {
      extends: () => this,
      value: extension
    }
  );

  return extensionId;
}

module.exports = defineExtension.call(Function, defineExtension);