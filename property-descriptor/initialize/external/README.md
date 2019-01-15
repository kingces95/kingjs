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
  external: function(name, target) {
    assert(name == 'foo');
    assert(target == Target);
    return {
      enumerable: true,
      value: Foo 
    };
  }
}
external.call(descriptor, 'foo', Target);
assert(descriptor.value == Foo);
assert(descriptor.enumerable);
assert(descriptor.configurable);
```
## API
```ts
external(this, name, target)
```
### Parameters
- `this`: The descriptor that delegates its initialize the callback `external`.
- `name`: First callback arg. Generally the name of the property.
- `target`: Second callback arg. Generally the target, a function or prototype.
### Returns
The descriptor whose properties have been overwritten with those of the callback result.
### Remarks
If the callback returns a function it will be assigned to the descriptor `value` property.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.initialize.external
```
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/initialize/external)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.initialize
[ns2]: https://www.npmjs.com/package/@kingjs/property-descriptor.initialize.external
