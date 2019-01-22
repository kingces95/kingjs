# @[kingjs][@kingjs]/[property-descriptor][ns0].[create-from-context][ns1]
Create a descriptor by delegating creation to a a callback which is passed the `name` and `target` of the property being defined.
## Usage
```js
var assert = require('assert');
var createFromContext = require('@kingjs/property-descriptor.create-from-context');

function Target() { };
function Foo() { }

function init(name, target) {
  assert(name == 'foo');
  assert(target == Target);
  return {
    enumerable: true,
    value: Foo 
  };
}

var descriptor = createFromContext(init, 'foo', Target);
assert(descriptor.value == Foo);
assert(descriptor.enumerable);
```

## API
```ts
createFromContext(callback(name, target), name, target)
```
### Parameters
- `callback`: Returns a a descriptor given `name` and `target`.
  - `name`: The name of property being described.
  - `target`: The target on which the property is defined.
- `name`: The name of property being described.
- `target`: The target on which the property is defined.
### Returns
A descriptor created based on `name` and `target`.
### Remarks
The implementation is trivial but the concept of a property being completely defined by a name plus metadata attached to the target is quite powerful. It allows a mini declarative DSL to be created  and expressed as attributes attached to functions.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.create-from-context
```
## Source
https://repository.kingjs.net/property-descriptor/create-from-context
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/create-from-context)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.create-from-context
