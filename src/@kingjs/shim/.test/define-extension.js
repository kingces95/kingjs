var assert = require('assert')

var {
  ['@kingjs']: {
    IInterface: { Id },
    reflect: { defineProperty }
  }
} = require('./dependencies');

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