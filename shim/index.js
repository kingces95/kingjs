//'use strict';

var {
  '@kingjs/define-interface': defineInterface,
} = require('@kingjs/require-packages').call(module);

var kingjs = { };

// IInterface (builtIn)
var { IInterface } = defineInterface;
kingjs.IInterface = IInterface;

// IIterable
defineInterface(kingjs, 'IIterable', {
  id: '@kingjs/IIterable',
  members: { getIterator: Symbol.iterator },
}),

// IEnumerable
defineInterface(kingjs, 'IEnumerable', {
  id: '@kingjs/IEnumerable',
  members: { getEnumerator: null },
}),

// IEnumerator
defineInterface(kingjs, 'IEnumerator', {
  id: '@kingjs/IEnumerator',
  members: {
    moveNext: null,
    current: null,
  },
}),

Symbol.kingjs = kingjs;

// Array : IIterable
require('./shim-array');

// String : IIterable
require('./shim-string');

// Generator : IIterable, IEnumerable
require('./shim-generator');

module.exports = kingjs;