var assert = require('assert')

var {
  ['@kingjs']: {
    defineInterface,
    reflect: { defineProperty }
  }
} = require('../dependencies');

var {
  IInterface: { Id }
} = defineInterface;

function defineExtension(extension) {
  assert(this instanceof Function);
  assert(extension instanceof Function);

  var extensionId = extension[Id];
  if (!extensionId)
    extensionId = extension[Id] = Symbol(extension.name);

  defineProperty(
    Object.prototype, 
    extensionId, {
      extends: () => this,
      value: extension
    }
  );

  return extensionId;
}

module.exports = defineExtension.call(Function, defineExtension);