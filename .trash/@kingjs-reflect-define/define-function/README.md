# @[kingjs][@kingjs]/[reflect][ns0].[define-function][ns1]
Extends `kingjs/reflect.define-property` with richer overloads.
## Usage
```js
var assert = require('assert');
var defineFunction = require('@kingjs/reflect.define-function');

var target = defineFunction({ bar: 1 }, 'foo', 'this.bar');
assert(target.foo() == 1);
```

## API
```ts
defineFunction(target, name, descriptor)
```
## Overloads
```js
defineField(target, name, string)
  => defineProperty(target, name, { value: lambda, function: true });

// inherited from @kingjs/reflect.define-property
defineField(...)
  => defineProperty(...);
```

### Parameters
- `target`: The target on which the property will be defined.
- `name`: The name of the property.
- `descriptor`: A descriptor describing the property.



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/reflect.define-function
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.define-property`](https://www.npmjs.com/package/@kingjs/reflect.define-property)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
## Source
https://repository.kingjs.net/reflect/define-function
## License
MIT

![Analytics](https://analytics.kingjs.net/reflect/define-function)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/reflect
[ns1]: https://www.npmjs.com/package/@kingjs/reflect.define-function
