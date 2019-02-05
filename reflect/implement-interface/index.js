'use strict';
var assert = require('assert');

var {
  ['@kingjs']: {
    is,
    reflect: { defineFunction, defineAccessor }
  },
} = require('./dependencies');

var InterfaceId = Symbol.for('@kingjs/IInterface.id');

/**
 * @description Extends `kingjs/reflect.define-property` to map names
 * to symbols according to iface.
 * 
 * @param target The target on which the interface will be declared.
 * @param iface A map for names to symbols used to rename properties declared
 * in the descriptor.
 * @param descriptors A descriptor of methods and accessors that implement
 * the interface.
 * @param descriptors.accessors Descriptors that implement the interfaces' accessors.
 * @param descriptors.methods Descriptors that implement the interfaces' methods.
 * 
 * @returns Returns target.
 */
function implementInterface(target, iface, descriptors) {

  // assert target implements ifaces that iface extends
  for (var extension of Object.getOwnPropertySymbols(iface)) {
    if (iface[extension] !== InterfaceId)
      continue;

    assert(extension in target);
  }
  
  // accessors
  for (var name in descriptors.accessors) {
    var accessor = descriptors.accessors[name];

    // map name
    var symbol = iface[name];
    assert(is.symbol(symbol));

    defineAccessor(target, symbol, accessor);
  }
  
  // methods
  for (var name in descriptors.methods) {
    var method = descriptors.methods[name];

    // map name
    var symbol = iface[name];
    assert(is.symbol(symbol));

    defineFunction(target, symbol, method);
  }
  
  // tag the target as having implemented the interface
  // Id may be in target already if iface member shares the same Id
  if (iface[InterfaceId] in target == false)
    target[iface[InterfaceId]] = InterfaceId;

  // assert all iface members implemented
  for (var name in iface) {
    var symbol = iface[name];
    if (!is.symbol(symbol))
      continue;
    assert(symbol in target);
  }
  
  return target;
}

module.exports = implementInterface;