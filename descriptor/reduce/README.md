# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).reduce
Accumulate properties of a descriptor using a callback.
## Usage
Increment all descriptor values like this:
```js
var reduce = require('@kingjs/descriptor.reduce');

function callback(value, key) {
  return value + 1;
}

var descriptor = {
  foo: 0,
  bar: 1,
}

reduce.call(descriptor, callback);
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
declare function reduce(
  this: Descriptor,
  callback: (value, key: string) => any
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor whose properties are to be mapped.
- `callback`: A mapping function called for each property of `this`.
  - `value`: The value being mapped.
  - `key`: The name of the property being mapped.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.reduce
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/reduce)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor