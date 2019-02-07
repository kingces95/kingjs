// Array : IIterable
require('./shim-array');

// String : IIterable
require('./shim-string');

// Generator : IIterable, IEnumerable
require('./shim-generator');

// tag environment as being shimmed!
var kingJsTag = Symbol.for('@kingjs');
Object.defineProperty(Object.prototype, kingJsTag, { value: null });