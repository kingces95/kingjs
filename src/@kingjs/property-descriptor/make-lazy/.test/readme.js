`use strict`;
var assert = require('assert');
var makeLazy = require('..');

var Seeded = true;
var Seed = null;

var count;
var next = () => count++;

function Type() { }
Object.defineProperties(
  Type.prototype, {
    lazyAccessor: makeLazy.call({ get: next }, 'lazyAccessor'),
    lazyFunction: makeLazy.call({ value: next }, 'lazyFunction'),

    writeOnceAccessor: makeLazy.call(
      { get: o => o },
      'writeOnceAccessor',
      Seeded, 
      Seed
    ),
    
    resolve: makeLazy.call(
      { value: o => o }, 
      'resolve', 
      Seeded,
      Seed
    ),
  }
)

var instance = new Type();

// lazy accessor
count = 0;
assert(instance.lazyAccessor == 0);
assert(instance.lazyAccessor == 0);

// lazy function
count = 0;
assert(instance.lazyFunction() == 0);
assert(instance.lazyFunction() == 0);

// writeOnce accessor
instance.writeOnceAccessor = 0; // if absent, then DefaultValue is returned
assert(instance.writeOnceAccessor == 0);
assert(Object.getOwnPropertyDescriptor(instance, 'writeOnceAccessor').writable === false);

// resolver function
instance.resolve = 0; // if absent, then DefaultValue is returned
assert(instance.resolve() == 0);
assert(Object.getOwnPropertyDescriptor(instance, 'resolve').writable === false);

