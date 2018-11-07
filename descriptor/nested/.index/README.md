# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).nested
Exports all `@kingjs/descriptor.nested.*` functionality in one package.
## Usage
```js
var nested = require('@kingjs/descriptor.nested');
```
## Interfaces
```ts
declare interface NestedDescriptor {
  [index: string | number]: NestedDescriptor
} | any
```
## Remarks
A `NestedDescriptor` can be though of like 
- a tree composed of nodes and leafs or 
- a collection of paths composed of directories and files.
 
APIs take at least two descriptors. The first, a tree, is the data to be selected, mutated, or merged according to the second, a set of paths, which acts as metatdata to distinguish nodes from leafs in the tree as well as drive the operation.
## Namespace
- [`array`][array]
## API
- [`forEach`][for-each]
- [`freeze`][freeze]
- [`merge`][merge]
- [`reduce`][reduce]
- [`scorch`][scorch]
- [`toArray`][to-array]
- [`toPaths`][to-paths]
- [`update`][update]
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested)

  [array]: https://www.npmjs.com/package/@kingjs/descriptor.nested.array
  [for-each]: https://www.npmjs.com/package/@kingjs/descriptor.nested.for-each
  [freeze]: https://www.npmjs.com/package/@kingjs/descriptor.nested.freeze
  [merge]: https://www.npmjs.com/package/@kingjs/descriptor.nested.merge
  [reduce]: https://www.npmjs.com/package/@kingjs/descriptor.nested.reduce
  [scorch]: https://www.npmjs.com/package/@kingjs/descriptor.nested.scorch
  [to-array]: https://www.npmjs.com/package/@kingjs/descriptor.nested.to-array
  [to-paths]: https://www.npmjs.com/package/@kingjs/descriptor.nested.to-paths
  [update]: https://www.npmjs.com/package/@kingjs/descriptor.nested.update