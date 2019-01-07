//'use strict';

var {
  '@kingjs/define-interface': defineInterface,
} = require('@kingjs/require-packages').call(module);

var defineExtension = require('./define-extension');
var DefineExtension = defineExtension.call(Function, defineExtension);

var { 
  IInterface,
} = defineInterface;

var kingjs = {
  IInterface,
  DefineExtension,
};

Symbol.kingjs = kingjs;

var defineInterfaceOn = require('./define-interface-on');
kingjs.DefineInterfaceOn = IInterface[DefineExtension](defineInterfaceOn);

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

module.exports = kingjs;