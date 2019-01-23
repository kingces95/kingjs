# @[kingjs][@kingjs]/[property-descriptor][ns0].[construct-field][ns1]
Construct an object `{ target, name, descriptor: { value } }`.
## Usage
```js
var assert = require('assert');
var createField = require('@kingjs/property-descriptor.construct-field');

function Type() { }
var value = 42; 

// construct/deconstruct a description of a property that acts like a field
var { target, name, descriptor } = createField(Type.prototype, 'field', value);
assert(target == Type.prototype);
assert(name == 'field');
assert(descriptor.value == value);

// define the property
Object.defineProperty(target, name, descriptor);
assert(target[name] == value);
```

## API
```ts
createField(target, name, value)
```
### Parameters
- `target`: The target on which the property will be defined.
- `name`: The name of the property.
- `value`: The value of the property.
### Returns
An object `{ target, name, descriptor: { value } }` whose values correspond to their respective arguments.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.construct-field
```
## Source
https://repository.kingjs.net/property-descriptor/construct-field
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/construct-field)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.construct-field
