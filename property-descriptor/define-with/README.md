# @[kingjs][@kingjs]/[property-descriptor][ns0].[define-many][ns1]
The description.
## Usage
```js
var assert = require('assert');
var xxx = require('@kingjs/property-descriptor.define-many');
```

## API
```ts
defineMany(this, closure, target, descriptors)
```
### Parameters
- `this`: The callback to invoke for each name or symbol in descriptors.
- `closure`: An object, typically bound, that modifies the arguments passed to `callback`.
- `closure.constructor`: A callback to normalize each value of `descriptors`.
  - `target`: The `target`.
  - `name`: The name or symbol of a value of `descriptors`.
  - `value`: A value of `descriptors`.
  - Returns `{ target, name, descriptor }`.
- `closure.defaults`: Default properties to assign to each descriptor.
- `target`: Target on which each descriptor in `descriptors` will be declared.
- `descriptors`: Descriptors to define on `target`.
### Returns
Returns `target`.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.define-many
```
## Source
https://repository.kingjs.net/property-descriptor/define-many
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/define-many)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.define-many
