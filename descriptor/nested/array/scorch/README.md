# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).[array](https://www.npmjs.com/package/@kingjs/descriptor.nested.array).scorch
Clears a tree of descriptor properties with `undefined` value.
## Usage
Scorch a tree of descriptors like this:
```js
'use strict';

var scorch = require('@kingjs/descriptor.nested.array.scorch');

var values = {
  alice: {
    pet: { name: 'tiger' }
  },
  bob: {
    pet: { name: undefined }
  },
}

scorch(values, {
  '*': { pet: null }
});

values;
```
result:
```js
{
  alice: {
    pet: { name: 'tiger' }
  },
  bob: {
    pet: { }
  },
}
```
## API
```ts
declare function scorch(
  tree: NestedDescriptor,
  paths: NestedDescriptor
): void
```
### Interfaces
- `NestedArray`: see [@kingjs/descriptor/nested/array][nested-array-descriptor]
- `NestedDescriptor`: see [@kingjs/descriptor/nested][nested-descriptor]
### Parameters
- `tree`: The tree whose nodes will be purged of properties with undefined value.
- `paths`: The paths of the tree to purged of properties with undefined value.
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