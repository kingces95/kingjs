'use strict';
var assert = require('assert');

var {
  '@kingjs/object-ex': objectEx,
} = require('@kingjs/require-packages').call(module);

var Id = Symbol.for('@kingjs/IInterface.id');

function implementInterface(target, iface, descriptors) {

  // assert target implements ifaces that iface extends
  for (var extension of Object.getOwnPropertySymbols(target)) {
    if (target[extension] !== Id)
      continue;

    assert(extension in target);
  }
  
  // implement iface members
  for (var member in descriptors) {

    // map name to memberId
    var memberId = iface[member];
    assert(memberId);

    var descriptor = descriptors[member];
    if (typeof descriptor == 'function')
      descriptor = { value: descriptor };

    objectEx.defineProperty(target, memberId, descriptor);
  }

  // assert all iface members implemented
  for (var name in iface) {
    var symbol = iface[name];
    if (typeof symbol != 'symbol')
      continue;

    assert(symbol in target);
  }
  
  // tag the target as having implemented the interface
  target[iface[Id]] = Id;
  
  return target;
}

module.exports = implementInterface;