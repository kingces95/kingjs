var {
  ['@kingjs']: {
    defineInterface
  }
} = require('./dependencies');

var kingjs = Symbol.kingjs = { };

// IInterface (builtIn)
var { IInterface } = defineInterface;
kingjs.IInterface = IInterface;

// IIterable
defineInterface(kingjs, 'IIterable', {
  id: Symbol.iterator,
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

// Array : IIterable
require('./shim-array');

// String : IIterable
require('./shim-string');

// Generator : IIterable, IEnumerable
require('./shim-generator');

module.exports = kingjs;