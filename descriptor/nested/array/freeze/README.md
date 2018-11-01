# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).[array](https://www.npmjs.com/package/@kingjs/descriptor.nested.array).to-array
Freezes an array tree and it's values.
## Usage
Freeze a array tree of descriptors like this:
```js
'use strict';

var freeze = require('@kingjs/descriptor.nested.array.freeze');

var values = [
  {},
  [{}],
  0
]

freeze(values);
```
result:
```js
[
  {},
  [{}],
  0
]
```
## API
```ts
declare function freeze(
  tree: NestedDescriptor,
): void
```
### Interfaces
- `NestedArray`: see [@kingjs/descriptor/nested/array][nested-array-descriptor]
- `NestedDescriptor`: see [@kingjs/descriptor/nested][nested-descriptor]
### Parameters
- `tree`: The array tree whose nodes and values will be frozen.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.array.freeze
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/freeze)

[nested-array-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested/array  
[nested-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested