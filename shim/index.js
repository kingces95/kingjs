//'use strict';

var {
  '@kingjs/define-interface': defineInterface,
} = require('@kingjs/require-packages').call(module);

var defineExtension = require('./define-extension');

var { 
  IInterface, IInterface: { Id },
} = defineInterface;

var DefineExtension = defineExtension.call(Function, defineExtension);
var Implement = Function[DefineExtension](function implement(iface, descriptor) {
  var id = iface[Id];
  this.prototype[id] = iface;

  for (var member in descriptor) {
    var memberId = iface[member];
    Object.defineProperty(this.prototype, memberId, {
      value: descriptor[member]
    })
  }
})

Symbol.kingjs = {
  IInterface,
  DefineExtension,
  Implement,
};

defineInterface(Symbol.kingjs, 'IIterable', {
  id: '@kingjs/IIterable',
  members: { GetIterator: Symbol.iterator },
}),

defineInterface(Symbol.kingjs, 'IEnumerable', {
  id: '@kingjs/IEnumerable',
  members: { GetEnumerator: null },
}),

defineInterface(Symbol.kingjs, 'IEnumerator', {
  id: '@kingjs/IEnumerator',
  members: {
    MoveNext: null,
    Current: null,
  },
}),

// Array : IIterable
require('./shim-array');

// String : IIterable
require('./shim-string');

// Generator : IIterable, IEnumerable
require('./shim-generator');

module.exports = Symbol.kingjs;