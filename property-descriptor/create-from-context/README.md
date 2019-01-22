# @[kingjs][@kingjs]/[property-descriptor][ns0].[initialize][ns1].[external][ns2]
Overwrites a descriptors properties with those of the result of a callback invoked with the name and target.
## Usage
```js
var assert = require('assert');
var external = require('@kingjs/property-descriptor.initialize.external');

function Target() { };
function Foo() { }

var descriptor = {
  configurable: true,
  enumerable: false,
}

external.call(descriptor, () => Foo, 'foo', Target);
assert(descriptor.value == Foo);
assert(!descriptor.enumerable);
assert(descriptor.configurable);

function init(name, target) {
  assert(name == 'foo');
  assert(target == Target);
  return {
    enumerable: true,
    value: Foo 
  };
}

external.call(descriptor, init, 'foo', Target);
assert(descriptor.value == Foo);
assert(descriptor.enumerable);
assert(descriptor.configurable);
```

## API
```ts
external(this, callback(name, target), name, target)
```
### Parameters
- `this`: The descriptor that delegates its initialization to `callback`.
- `callback`: Returns a function or a descriptor given `name` and `target`.
  - `name`: The name of property being described.
  - `target`: The target on which the property is defined.
- `name`: The name of property being described.
- `target`: The target on which the property is defined.
### Returns
The descriptor whose properties have been overwritten with those of the callback result.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.initialize.external
```
## Source
https://repository.kingjs.net/property-descriptor/initialize/external
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/initialize/external)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.initialize
[ns2]: https://www.npmjs.com/package/@kingjs/property-descriptor.initialize.external
