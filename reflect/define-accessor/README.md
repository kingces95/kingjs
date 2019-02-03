# @[kingjs][@kingjs]/[reflect][ns0].[define-accessor][ns1]
Extends `kingjs/reflect.define-property` with richer overloads.
## Usage
```js
var assert = require('assert');
var defineFunction = require('@kingjs/reflect.define-accessor');

var target = defineFunction({ bar: 1 }, 
  function foo() { return this.bar; },
  function(value) { return this.bar = value; }
);
assert(target.foo == 1);
target.foo = 2;
assert(target.bar == 2);
assert(target.propertyIsEnumerable('foo'));

var target = defineFunction({ bar: 1 }, 'foo', 
  function() { return this.bar; },
  function(value) { this.bar = value; }
);
assert(target.foo == 1);
target.foo = 2;
assert(target.bar == 2);
assert(target.propertyIsEnumerable('foo'));

var target = defineFunction({ bar: 1 }, 'foo', 
  'this.bar', 
  'this.bar = value'
);
assert(target.foo == 1);
target.foo = 2;
assert(target.bar == 2);
assert(target.propertyIsEnumerable('foo'));

```

## API
```ts
defineAccessor(target, name, descriptor)
```
## Overloads
```js
defineAccessor(target, get[, set])
  => defineProperty(target, get.name || set.name, { get, set });

defineAccessor(target, name, get[, set])
  => defineProperty(target, name, { get, set });

defineAccessor(target, name, string[, string])
  => defineProperty(target, name, { get: lambda, set: lambda });

// inherited from @kingjs/reflect.define-property
defineAccessor(...)
  => defineProperty(...);
```

### Parameters
- `target`: The target on which the property will be defined.
- `name`: The name of the property.
- `descriptor`: A descriptor describing the property.



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/reflect.define-accessor
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/is`](https://www.npmjs.com/package/@kingjs/is)|`^1.0.9`|
|[`@kingjs/reflect.define-property`](https://www.npmjs.com/package/@kingjs/reflect.define-property)|`^1.0.2`|
## Source
https://repository.kingjs.net/reflect/define-accessor
## License
MIT

![Analytics](https://analytics.kingjs.net/reflect/define-accessor)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/reflect
[ns1]: https://www.npmjs.com/package/@kingjs/reflect.define-accessor
