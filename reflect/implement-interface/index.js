'use strict';
var assert = require('assert');

var {
  ['@kingjs']: {
    is,
    reflect: { defineFunction, defineAccessor }
  },
} = require('./dependencies');

var Slot = Symbol.for('@kingjs/IInterface.slot');

/**
 * @description Extends `kingjs/reflect.define-property` to map names
 * to symbols according to iface.
 * 
 * @param instance The instance on which the interface members will be defined.
 * @param iface A map for names to symbols used to rename properties declared
 * in the descriptor.
 * @param members Property descriptors defined here are copied to instance but
 * with its corresponding symbolic name found on iface.
 * 
 * @returns Returns type.
 */
function implementInterface(instance, iface, members) {

  // assert type implements ifaces that iface extends
  for (var extension of Object.getOwnPropertySymbols(iface)) {
    if (iface[extension] !== Slot)
      continue;

    assert(extension in instance);
  }
  
  // define members
  for (var name in members) {

    // map name
    var symbol = iface[name];
    assert(is.symbol(symbol));

    var descriptor = Object.getOwnPropertyDescriptor(members, name);
    Object.defineProperty(instance, symbol, descriptor);
  }

  // assert all iface members implemented
  for (var name in iface) {
    var symbol = iface[name];
    if (!is.symbol(symbol))
      continue;
    assert(symbol in instance);
  }
  
  return instance;
}

module.exports = implementInterface;