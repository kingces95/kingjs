# @[kingjs][@kingjs]/[reflect][ns0].[define-property][ns1]
Extends `Reflect.defineProperty` to allow richer descriptors which can include `callback`, `extends`, and `lazy` properties. And `lazy` can be modified by `writeOnce`, `argument`, and `static`.
## Usage
```js
var assert = require('assert');
var defineProperty = require('@kingjs/reflect.define-property');

var target = null;

// create descriptor by harvesting name from named function
var { name, descriptor } = defineProperty(
  null, function foo() { }
)
assert(name == 'foo');
assert(descriptor.value.name == 'foo');

var target = { };

// harvest name from named function
defineProperty(
  target, function foo() { return 0; }
)
assert(target.foo() == 0);

// harvest name from named function in a descriptor
defineProperty(
  target, { value: function bar() { return 0; } }
)
assert(target.bar() == 0);

// harvest name from named get/set in a descriptor
defineProperty(
  target, { get: function baz() { return 0; } }
)
assert(target.baz == 0);

// wrap get/set in a function
defineProperty(
  target, 'lambda', { get: 'this' }
)
assert(target.lambda == target);

// a "readOnly" property can be set only once
defineProperty(
  target, 'readOnly', { 
    get: o => o, 
    lazy: true,
    seeded: true,
    static: true, // because target == this at runtime
    /* seed: 20 */ // un-comment to provide a default
  }
)
target.readOnly = 10;
assert.throws(() => target.readOnly = 20);
assert(target.readOnly == 10);

// wrap value in a function if descriptor is lazy
defineProperty(
  target, 'lazyLambda', { 
    value: 'this.i++', 
    lazy: true,
    static: true, // because target == this at runtime
  }
)
target.i = 0;
assert(target.lazyLambda() == 0);
assert(target.lazyLambda() == 0);

// wrap value in a function if descriptor is an extension
var GetLength = Symbol('getLength');
defineProperty(
  Object.prototype, GetLength, { 
    value: 'this.length', 
    extends: () => String 
  }
)
assert('foo'.length == 'foo'[GetLength]()); // extends String
assert.throws(() => [ ][GetLength]()) // does not extend Array

// defer creation of descriptor until target and name are known
defineProperty(
  target, 
  'extern', { 
    callback: (d, n, t) => ({
      ...d,
      get: () => ({ 
        target: t, name: n 
      }) 
    })
  }
)
assert(target.extern.name == 'extern');
assert(target.extern.target == target);

```

## API
```ts
defineProperty(target, name, descriptor)
```
## Overloads
```js
defineProperty(target, namedFunction)
  => defineProperty(target, name, { value: namedFunction, ... })
  
defineProperty(target, { get|set|value: namedFunction, ... })
  => defineProperty(target, name, { get|set|value: namedFunction, ... })

defineProperty(target, name, nonObjectOrNull)
  => defineProperty(target, name, { value: nonObjectOrNull })
```

### Parameters
- `target`: The target on which the property will be defined.
- `name`: The name of the property.
- `descriptor`: A descriptor which supports these additional properties:
- `descriptor.extends`: A callback that returns a type (function) representing  the type being extended. If runtime `this` is not an `instanceof` the type,  then an exception is thrown. An extension's `name` must be a symbol and its `target` must be `Object.prototype`.
  - Returns a function representing the type being extended.
- `descriptor.lazy`: Caches the result of the property on the runtime `this`.
- `descriptor.seeded`: Modifies `lazy`. Allows setting the property with a  value that gets passed to the promise when resolved.
- `descriptor.seed`: Modifies `seeded`. If no value is set, then `seed` is used as a default.
- `descriptor.static`: Modifies `lazy`. Makes the stub configurable so, if runtime `this` and `target` are the same object, the stub can be replaced with the cached value.
- `descriptor.callback`: Called just before calling `Object.defineProperty` to allow the descriptor to configure itself given `name` and `target`.  The resulting descriptor is passed to a recursive call of `defineProperty`.
  - `descriptor`: A copy of the descriptor.
  - `name`: The name of the property.
  - `target`: The target on which the property will be defined.
  - Returns an updated descriptor.
### Returns
Returns `target` if the property was successfully created.  Otherwise `undefined` is returned. If `target` is `null` or `undefined` then `{ name, descriptor }` is returned.
### Remarks
- Strings that appear where functions are expected will be wrapped into functions; String values for `get` or `set`,  or `value` when `extends` or `lazy` is present are wrapped as functions.
- Transforms are applied in the order: `lambdize` > `extends` > `lazy` > `callback`.
- After applying transforms associated with the properties `callback`, `extends`,  and `lazy`, the corresponding property is deleted from the descriptor. This can only be  seen if no `target` is supplied causing the descriptor to be returned.
## See Also
- [`@kingjs/reflect.define-function`][defineFunction]
- [`@kingjs/reflect.define-accessor`][defineAccessor]
- [`@kingjs/reflect.define-value`][defineValue]

[defineFunction]: https://www.npmjs.com/package/@kingjs/reflect.define-function
[defineAccessor]: https://www.npmjs.com/package/@kingjs/reflect.define-accessor
[defineValue]: https://www.npmjs.com/package/@kingjs/reflect.define-value
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/reflect.define-property
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/is`](https://www.npmjs.com/package/@kingjs/is)|`^1.0.9`|
|[`@kingjs/property-descriptor.lambdize`](https://www.npmjs.com/package/@kingjs/property-descriptor.lambdize)|`^1.0.2`|
|[`@kingjs/property-descriptor.make-lazy`](https://www.npmjs.com/package/@kingjs/property-descriptor.make-lazy)|`^1.0.3`|
|[`@kingjs/property-descriptor.target-instance-of`](https://www.npmjs.com/package/@kingjs/property-descriptor.target-instance-of)|`^1.0.3`|
## Source
https://repository.kingjs.net/reflect/define-property
## License
MIT

![Analytics](https://analytics.kingjs.net/reflect/define-property)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/reflect
[ns1]: https://www.npmjs.com/package/@kingjs/reflect.define-property