'use strict';
var assert = require('assert');

var {
  ['@kingjs']: {
    is,
    propertyDescriptor: { define }
  },
} = require('./dependencies');

var Id = Symbol.for('@kingjs/IInterface.id');

/**
 * @description description comment.
 * 
 * @param target target comment.
 * @param iface iface comment.
 * @param descriptors descriptors comment.
 * 
 * @returns returns comment.
 */
function implementInterface(target, iface, descriptors) {

  // assert target implements ifaces that iface extends
  for (var extension of Object.getOwnPropertySymbols(target)) {
    if (target[extension] !== Id)
      continue;

    assert(extension in target);
  }
  
  // implement iface members
  for (var name in descriptors) {
    var descriptor = descriptors[name];

    // map name
    var symbol = iface[name];
    assert(is.symbol(symbol));

    define(target, symbol, descriptor);
  }
  
  // tag the target as having implemented the interface
  // Id may be in target already if iface member shares the same Id
  if (iface[Id] in target == false)
    target[iface[Id]] = Id;

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