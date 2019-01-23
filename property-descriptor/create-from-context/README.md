# @[kingjs][@kingjs]/[property-descriptor][ns0].[create-from-context][ns1]
Package a target, a name, and a descriptor created by a callback using `name` and `target`.
## Usage
```js
var assert = require('assert');
var createFromContext = require('@kingjs/property-descriptor.create-from-context');

function Type() { };
Type.info = x => x.toUpperCase();;

function init(name, target) {
  var ctor = target.constructor;
  return { value: () => ctor.info(name) };
}

var { target, name, descriptor } = createFromContext(Type.prototype, 'foo', init);
Object.defineProperty(target, name, descriptor);
var instance = new Type();
assert(instance.foo() == 'FOO');
```

## API
```ts
createFromContext(target, name, callback(name, target))
```
### Parameters
- `target`: The target on which the property is defined.
- `name`: The name of property being described.
- `callback`: Returns a a descriptor given `name` and `target`.
  - `name`: The name of property being described.
  - `target`: The target on which the property is defined.
### Returns
An object with `target`, `name`, and `descriptor` properties where the descriptor is created by the callback using `name` and `target`.
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
