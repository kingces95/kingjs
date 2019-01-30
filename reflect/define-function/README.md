# @[kingjs][@kingjs]/[reflect][ns0].[define-function][ns1]
Extends `kingjs/reflect.define-property` with richer overloads.
## Usage
```js
var assert = require('assert');
var xxx = require('@kingjs/reflect.define-function');
```

## API
```ts
defineFunction(target, name, descriptor)
```
## Overloads
```js
define(target, namedFunction)
  => define(target, name, { value: namedFunction, ... })

define(target, name, string)
  => define(target, name, { value: lambda, ... })

// inherited from @kingjs/reflect.define-property
define(target, { value: namedFunction, ... })
  => define(target, name, { value: namedFunction, ... })

define(target, { get|set: namedFunction, ... })
  => define(target, name, { get|set: namedFunction, ... })

define(target, name, { get|set: string, ... })
  => define(target, name, { get|set: lambda, ... })

define(target, name, nonObjectOrNull)
  => define(target, name, { value: nonObjectOrNull })
```

### Parameters
- `target`: The target on which the property will be defined.
- `name`: The name of the property.
- `descriptor`: A descriptor which supports additional properties inherited from `kingjs/reflect.define-property`.
### Returns
Returns `target` if the property was successfully created.  Otherwise `undefined` is returned. If `target` is `null` or `undefined` then `{ name, descriptor }` is returned.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/reflect.define-function
```
## Source
https://repository.kingjs.net/reflect/define-function
## License
MIT

![Analytics](https://analytics.kingjs.net/reflect/define-function)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/reflect
[ns1]: https://www.npmjs.com/package/@kingjs/reflect.define-function
