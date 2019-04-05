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

// EventEmitter : IEventTunable, IEventDetunable, IEventBroadcaster
require('./shim-event-emitter');

// Promise : IObservable
require('./shim-promise');

// tag environment as shimmed!
var { version } = require('./package.json');
var kingJsTag = Symbol.for('@kingjs');
Object.defineProperty(
  Object.prototype, 
  kingJsTag, { 
    value: parse(version) 
  }
);