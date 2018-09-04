# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).map
Updates values of a descriptor using a callback.
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
  callback: (value, key: string) => any,
  copyOnWrite: boolean
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor whose properties are to be mapped.
- `callback`: A mapping function called for each property of `this`.
  - `value`: The value being mapped.
  - `key`: The name of the property being mapped.
- `copyOnWrite`: If true, then a copy of `this` will be created on the first write and returned instead of `this`.
### Returns
Returns `this` after mapping properties using the `callback`. 

If `this` is frozen or `copyOnWrite` specified then a copy of `this` will be created on the first write and returned instead of `this`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.map
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/map)


  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor