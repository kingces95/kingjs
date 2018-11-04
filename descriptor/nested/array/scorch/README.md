# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).[array](https://www.npmjs.com/package/@kingjs/descriptor.nested.array).scorch
Clears an array tree of `undefined` values.
## Usage
Scorch an array tree of values like this:
```js
'use strict';

var values = [
  undefined,
  ['tiger'],
  [undefined]
]

scorch(values);

values;
```
result:
```js
[ [ 'tiger'] [ ] ]
```
## API
```ts
declare function scorch(
  tree: NestedDescriptor
): void
```
### Interfaces
- `NestedArray`: see [@kingjs/descriptor/nested/array][nested-array-descriptor]
### Parameters
- `tree`: The array tree whose nodes will be purged of properties with undefined values.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.array.freeze
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/array/freeze)

[nested-array-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested/array  
[nested-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested