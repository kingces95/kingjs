`use strict`;
var assert = require('assert');
var makeLazy = require('..');

var DefaultValue = null;
var IsWriteOnce = true;

var count;
var next = () => count++;

function Type() { }
Object.defineProperties(
  Type.prototype, {
    lazyAccessor: makeLazy.call({ get: next }, 'lazyAccessor'),
    lazyFunction: makeLazy.call({ value: next }, 'lazyFunction'),

    writeOnceAccessor: makeLazy.call(
      { }, // defaults to `get: o => o`
      'writeOnceAccessor',
      IsWriteOnce, 
      DefaultValue
    ),
    
    resolve: makeLazy.call(
      { value: o => o }, 
      'resolve', 
      IsWriteOnce,
      DefaultValue
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

