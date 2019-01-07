'use strict';
var assert = require('assert');

var DefineExtension = require('./define-extension');

var { 
  IInterface,
  IInterface: { Id }
} = Symbol.kingjs;

function defineInterfaceOn(target, descriptors) {
  var id = this[Id];
  target[id] = this;

  for (var member in descriptors) {
    var memberId = this[member];
    assert(memberId);

    var descriptor = descriptors[member];
    if (typeof descriptor == 'function')
      descriptor = { value: descriptor };

    Object.defineProperty(target, memberId, descriptor);
  }

  return target;
}

module.exports = IInterface[DefineExtension](defineInterfaceOn);