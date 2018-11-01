# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).[array](https://www.npmjs.com/package/@kingjs/descriptor.nested.array).to-array
Freezes paths of a tree.
## Usage
Freeze a tree of descriptors like this:
```js
'use strict';

var freeze = require('@kingjs/descriptor.nested.array.freeze');

var values = {
  alice: {
    pet: { name: 'tiger' }
  },
  bob: {
    pet: { name: 'snuggles' }
  },
  chris: {
    pet: { name: 'spike' }
  },
}

freeze(values, {
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
    pet: { name: 'snuggles' }
  },
  chris: {
    pet: { name: 'spike' }
  },
}
```
## API
```ts
declare function freeze(
  tree: NestedDescriptor,
  paths: NestedDescriptor
): void
```
### Interfaces
- `NestedArray`: see [@kingjs/descriptor/nested/array][nested-array-descriptor]
- `NestedDescriptor`: see [@kingjs/descriptor/nested][nested-descriptor]
### Parameters
- `tree`: The tree whose nodes will be frozen.
- `paths`: The paths of the tree to freeze.
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