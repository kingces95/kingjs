# @[kingjs][@kingjs]/[reflect][ns0].[define-property][ns1]
Extends `Reflect.defineProperty` to allow richer descriptors which can include `callback`, `extends`, and `lazy` properties. And `lazy` can be modified by `writeOnce`, `argument`, and `static`.
## Usage
```js
var assert = require('assert');
var xxx = require('@kingjs/reflect.define-property');
```

## API
```ts
defineProperty(target, name, descriptor)
```
## Overloads
```js
define(target, namedFunction)
  => define(target, name, { value: namedFunction, ... })
  
define(target, { value: namedFunction, ... })
  => define(target, name, { value: namedFunction, ... })

define(target, { get|set: namedFunction, ... })
  => define(target, name, { get|set: namedFunction, ... })

define(target, name, { get|set: string, ... })
  => define(target, name, { get|set: lambda, ... })

define(target, name, { value: string, lazy|extends: truthy, ... })
  => define(target, name, { value: lambda, lazy|extends: truthy, ... })

define(target, name, nonObjectOrNull)
  => define(target, name, { value: nonObjectOrNull })
```

### Parameters
- `target`: The target on which the property will be defined.
- `name`: The name of the property.
- `descriptor`: A descriptor which supports these additional properties:
- `descriptor.callback`: Called just before calling `Reflect.defineProperty` to allow the descriptor to configure itself given `name` and `target`.
  - `descriptor`: A copy of the descriptor.
  - `name`: The name of the property.
  - `target`: The target on which the property will be defined.
  - Returns an updated descriptor.
- `descriptor.extends`: A callback that returns a function representing  the type being extended. If runtime `this` is not an `instanceof` the returned function, then the property will throw an exception. If present, then `name` must be  a symbol and `target` must be `Object.prototype`.
  - Returns a function representing the type being extended.
- `descriptor.lazy`: Caches the result of the property on the runtime `this`.
- `descriptor.writeOnce`: Modifies `lazy`. Allows setting the property with a  value that gets passed to the promise when resolved.
- `descriptor.argument`: Modifies `writeOnce`. If no value is set, then `argument` is used as a default.
- `descriptor.static`: `descriptor.static`: Modifies `lazy`. Makes the stub configurable so, if runtime `this` and `target` are the same object, the stub can be replaced with the cached value.
### Returns
Returns `target` if the property was successfully created.  Otherwise `undefined` is returned. If `target` is `null` or `undefined` then `{ name, descriptor }` is returned.
### Remarks
- Strings that appear where functions are expected, namely the properties  `get` or `set`, or `value` when `extends` or `lazy` is present,  will be wrapped into functions.
- Transforms are applied in the order `lambdize`, then `extends`, then `lazy`, then `callback`.
- After applying transforms associated with the properties `callback`, `extends`,  and `lazy`, the corresponding property is deleted from the descriptor. This can only be  seen if no `target` is supplied causing the descriptor to be returned.
## See Also
- [@kingjs/reflect.define-function][defineFunction]
- [@kingjs/reflect.define-accessor][defineAccessor]
- [@kingjs/reflect.define-value][defineValue]
- [@kingjs/property-descriptor.lambdize][lambdize]
- [@kingjs/property-descriptor.target-instance-of][target-instance-of]
- [@kingjs/property-descriptor.make-lazy][make-lazy]

[defineFunction]: https://www.npmjs.com/package/@kingjs/reflect.define-function
[defineAccessor]: https://www.npmjs.com/package/@kingjs/reflect.define-accessor
[defineValue]: https://www.npmjs.com/package/@kingjs/reflect.define-value
[lambdize]: https://www.npmjs.com/package/@kingjs/property-descriptor.lambdize
[target-instance-of]: https://www.npmjs.com/package/@kingjs/property-descriptor.target-instance-of
[make-lazy]: https://www.npmjs.com/package/@kingjs/property-descriptor.make-lazy
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/reflect.define-property
```
## Source
https://repository.kingjs.net/reflect/define-property
## License
MIT

![Analytics](https://analytics.kingjs.net/reflect/define-property)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/reflect
[ns1]: https://www.npmjs.com/package/@kingjs/reflect.define-property
