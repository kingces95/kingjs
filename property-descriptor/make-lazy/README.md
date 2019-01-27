# @[kingjs][@kingjs]/[property-descriptor][ns0].[make-lazy][ns1]
Replaces a description of a function or accessor  with a corresponding descriptor that delegates to the original descriptor and caches its result in a a corresponding property on `this`.
## Usage
```js
`use strict`;
var assert = require('assert');
var makeLazy = require('@kingjs/property-descriptor.make-lazy');

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


```

## API
```ts
makeLazy(this, name[, writeOnce[, argument[, isStatic]]])
```
### Parameters
- `this`: A description of a get accessor or function. If neither, then `get` is set to the identify function.
- `name`: The name of the property described by `this`.
- `writeOnce`: If provided, then its assumed the get accessor or function described by `this` accepts a single argument. In this case, the returned promise descriptor may be set with a value which will be passed  to the original descriptor when the promise is fulfilled.
- `argument`: Modifies `writeOnce`. If no value is set before the  function or accessor is resolved then `argument` is set as a default.
- `isStatic`: If true then the returned promise descriptor is marked configurable. This allows the promise to replace itself as happens  when the descriptor is defined on a target that is also the `this` at  runtime.

### Remarks
If the original descriptor returns `undefined` then the promise is not fulfilled and may be tried again later. This allows the debugger to evaluate a promise before it's ready to be fulfilled without preventing fulfillment at the nominal time.
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
