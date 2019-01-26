# @[kingjs][@kingjs]/[property-descriptor][ns0].[define][ns1]
Like `Object.defineProperty` but allows a richer description of properties which include new descriptor properties `callback`, `extends`, and `lazy` which can be modified by `static` and `argument`.
## Usage
```js
var assert = require('assert');
var defineProperty = require('@kingjs/property-descriptor.define');

// accessor expressed as lambda
var target = { field: 0 };
defineProperty(target, 'accessor', { 
  get: 'this.field' 
});
assert(target.accessor == 0);
target.field = 1;
assert(target.accessor == 1);

// lazy member function expressed as lambda
function Type() { this.field = 0 };
defineProperty(Type.prototype, 'func', { 
  function: true,
  value: 'this.field',
  lazy: true,
});
var instance = new Type();
assert(instance.func() == 0);
instance.field = 1;
assert(instance.func() == 0);

// static lazy accessor expressed as lambda 
Type.staticField = 0;
defineProperty(Type, 'accessor', { 
  get: 'this.staticField',
  lazy: true,
  static: true,
});
assert(Type.accessor == 0);
Type.staticField = 1;
assert(Type.accessor == 0);

// field defined via callback once `name` and `target` are known
var descriptor = { 
  callback: function(self, name, target) {
    self.value = `${target.constructor.name}.${name}`
  }, 
}
defineProperty(Type.prototype, 'foo', descriptor);
defineProperty(Type.prototype, 'bar', descriptor);
var instance = new Type();
assert(instance.foo == 'Type.foo');
assert(instance.bar == 'Type.bar');

// token resolver
var tokens = [ '?', 'x', 'y', 'z' ];
defineProperty(Type.prototype, 'letter', {
  lazy: true,
  argument: 0,
  get: o => token[o]
});
var instance = new Type();
assert(instance.letter = '?');

var instance = new Type();
instance.letter = 2;
assert(instance.letter = 'y');

// extend `Array` with function Any() expressed as a lambda
var Any = Symbol('any');
defineProperty(Object.prototype, Any, {
  extends: () => Array,
  value: 'this.length > 0',
});
assert([][Any]() == false);
assert.throws(() => ''[Any]());
```

## API
```ts
define(target, name, descriptor)
```
### Parameters
- `target`: The target on which the property will be defined.
- `name`: The name of the property.
- `descriptor`: A descriptor which supports these additional properties:
- `descriptor.function`: Modifies `value`. Indicates `value`, if present, describes  a function as opposed to a "field". If `value` is a string then it will be "lambdized".
- `descriptor.callback`: Allows configuring the descriptor given `name` and `target`.
  - `descriptor`: A copy of the descriptor.
  - `name`: The name of the property.
  - `target`: The target on which the property will be defined.
  - Returns an updated descriptor.
- `descriptor.extends`: A callback that returns a function representing  the type being extended. If runtime `this` is not an `instanceof` the returned function, then the property will throw an exception. If present, then `name` must be  a symbol and `target` must be `Object.prototype`.
  - Returns a function representing the type being extended.
- `descriptor.lazy`: Caches the result of the property on the runtime `this`.
- `descriptor.static`: Modifies `lazy`. Set when runtime `this` and `target` are the same object.
- `descriptor.argument`: Modifies `lazy`. Allows setting the property with a  value that gets passed to the promise when resolved. If no value is set, then `argument` is used as a default.
### Returns
Return the target with a newly defined property.
### Remarks
- Strings that appear where functions are expected, namely  the properties `get` or `set`, or `value` when `function` is present, will be turned into functions.
- Transforms are applied in the order: "lambdize" as described above, then `callback`, then `extends`, then `lazy`. Transforms are only applied for descriptors describing functions or accessors.  Field descriptors undergo no transforms and the additional descriptor  properties are ignored.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.define
```
## Source
https://repository.kingjs.net/property-descriptor/define
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/define)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.define
