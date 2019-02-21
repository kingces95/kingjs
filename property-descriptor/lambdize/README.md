# @[kingjs][@kingjs]/[property-descriptor][ns0].[lambdize][ns1]
Wraps strings found in a descriptor's `value`, `get` or `set` into an appropriate corresponding lambda functions.
## Usage
```js
var assert = require('assert');
var lambdize = require('@kingjs/property-descriptor.lambdize');

// create a lambda function that simply returns zero
var fooDescriptor = lambdize.call({ value: '0' }, 'foo');
assert(fooDescriptor.value.name = 'foo');
var target = Object.defineProperty({ }, 'foo', fooDescriptor);
assert(target.foo() == 0);

// create lambda accessors that simply access a property `field`
var barDescriptor = lambdize.call({ 
  get: 'this.field', 
  set: 'this.field = value'
}, 'bar');
assert(barDescriptor.get.name = 'bar');
assert(barDescriptor.set.name = 'bar');
var target = Object.defineProperty({ field: 1 }, 'bar', barDescriptor);
assert(target.bar == 1);
target.bar = 2;
assert(target.field == 2);
```

## API
```ts
lambdize(this[, name])
```

### Parameters
- `this`: The descriptor whose `value`, `get` or `set` property, if strings, will be replaced with appropriate corresponding lambda functions. Only `set` has arguments, a single parameter named `value`.
- `name`: The name to assign any freshly created lambda functions.
### Returns
Returns `this` after it's strings are replaced with lambda functions.
### Remarks
A normal lambda uses the `this` from the surrounding lexical scope.  These pseduo-lambda's use the `this` supplied at runtime.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.lambdize
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.descriptor.rename`](https://www.npmjs.com/package/@kingjs/reflect.descriptor.rename)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
## Source
https://repository.kingjs.net/property-descriptor/lambdize
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/lambdize)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.lambdize
