# @[kingjs][@kingjs]/[property-descriptor][ns0].[make-lazy][ns1]
Replaces a description of a function or accessor with  a corresponding descriptor that delegates to the original descriptor and caches its result in a corresponding property on `this`.
## Usage
```js
`use strict`;
var assert = require('assert');
var makeLazy = require('@kingjs/property-descriptor.make-lazy');

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


```

## API
```ts
makeLazy(this, name[, seeded[, seed[, isStatic]]])
```

### Parameters
- `this`: A description of a get accessor or function. If neither, then `get` is set to the identify function.
- `name`: The name of the property described by `this`.
- `seeded`: Allows a value to be set on the property which is passed to the promise when the promise is fulfilled.
- `seed`: Modifies `seeded`. If no value is set before the  promise is fulfilled then `seed` will be used as a default.
- `isStatic`: If true then the returned promise descriptor is marked configurable. This allows the promise to replace itself as happens  when the descriptor is defined on a target that is also the `this` at  runtime.

### Remarks
 - If the original descriptor returns `undefined` then the promise is not fulfilled and may be tried again later. This allows the debugger to evaluate a promise before it's ready to be fulfilled while allowing fulfillment at the nominal time.
 - The descriptor may not be writable nor have a set accessor.
 - If the descriptor has a value, is must be a function.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.make-lazy
```

## Source
https://repository.kingjs.net/property-descriptor/make-lazy
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/make-lazy)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.make-lazy
