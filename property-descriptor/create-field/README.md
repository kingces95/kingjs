# @[kingjs][@kingjs]/[property-descriptor][ns0].[create-field][ns1]
Package a target, a name and a descriptor formed by wrapping a value.
## Usage
```js
var assert = require('assert');
var createField = require('@kingjs/property-descriptor.create-field');

var value = 42; 
var { target, name, descriptor } = createField({ }, 'field', value);

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
An object with properties `target`, `name`, and `descriptor` which itself has a property `value` each with values corresponding to their respective arguments.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.create-field
```
## Source
https://repository.kingjs.net/property-descriptor/create-field
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/create-field)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.create-field
