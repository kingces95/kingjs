# @[kingjs][@kingjs]/[reflect][ns0].[define-field][ns1]
Constrains `kingjs/reflect.define-property` to a single overload for declaring a field.
## Usage
```js
var assert = require('assert');
var defineField = require('@kingjs/reflect.define-field');

var target = defineField({ }, 'foo', { value: 1 })
assert.deepEqual(target.foo, { value: 1 });
```

## API
```ts
defineAccessor(target, name, value)
```
## Overloads
```js
defineField(target, name, value)
  => defineProperty(target, name, { value });
```

### Parameters
- `target`: The target on which the property will be defined.
- `name`: The name of the property.
- `value`: The value of the field.



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/reflect.define-field
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.define-property`](https://www.npmjs.com/package/@kingjs/reflect.define-property)|`^1.0.2`|
## Source
https://repository.kingjs.net/reflect/define-field
## License
MIT

![Analytics](https://analytics.kingjs.net/reflect/define-field)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/reflect
[ns1]: https://www.npmjs.com/package/@kingjs/reflect.define-field
