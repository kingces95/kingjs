var {
  ['@kingjs']: {
    packageVersion: { parse }
  }
} = require('./dependencies');

// Array : IIterable
require('./shim-array');

// String : IIterable
require('./shim-string');

// Generator : IIterable, IEnumerable
require('./shim-generator');

// tag environment as shimmed!
var { version } = require('./package.json');
var kingJsTag = Symbol.for('@kingjs');
Object.defineProperty(
  Object.prototype, 
  kingJsTag, { 
    value: parse(version) 
  }
);