# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).map
Creates a shallow copy of a descriptor optionally using a callback to transform values.
## Usage
Increment all descriptor values like this:
```js
var map = require('@kingjs/descriptor.map');

function callback(value, key) {
  return value + 1;
}

var descriptor = {
  foo: 0,
  bar: 1,
}

map.call(descriptor, callback);
```
result:
```js
{
  foo: 1,
  bar: 2
}
```
## API
```ts
declare function map(
  this: Descriptor,
  callback: (this, value, key: string) => any,
  thisArg?,
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor whose properties are to be mapped.
- `callback`: A mapping function called for each property of `this`.
  - `value`: The value being mapped.
  - `key`: The name of the property being mapped.
- `thisArg`: The `this` argument to pass to `callback`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.map
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/map)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor