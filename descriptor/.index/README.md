# @[kingjs](https://www.npmjs.com/package/kingjs)/descriptor
Exports all `@kingjs/descriptor.*` functionality in one package.
## Usage
```js
var descriptor = require('@kingjs/descriptor');
```
## Interfaces
```ts
declare interface Descriptor {
  [index: string | number]: any
}
```
## API
### Namespaces
- [`family`][family]
- [`nested`][nested]

### Packages
- [`create`][create]
- [`inherit`][inherit]
- [`keys`][keys]
- [`mapNames`][map-names]
- [`merge`][merge]
- [`path`][path]
- [`pluck`][pluck]
- [`scorch`][scorch]
## Remarks
A `descriptor` is
- **Data**; Functions are not meant to be invoked from a descriptor (except for the default `Array` operations). Algorithms do not create accessor properties nor make allowance for accessor properties.
- **Flat**; Algorithms do not differentiate between between inherited and own properties.
- **Treeish**; Algorithms assume a descriptor is a tree unless they explicitly state otherwise.
- **Anonymous**; Two descriptors are equal if they have the same properties with the same values. 
- **Piped**; Algorithms that could reasonably be construed to operate on a descriptor accept the descriptor as `this` and strive to return the descriptor a clone.
- **Potentially Frozen, Optionally immutable**; Algorithms anticipate that a descriptor may be frozen and clone via `Object.create` before writing to the object. Such algorithms accept a `copyOnWrite` argument which prevents mutation of the descriptor and instead returns a clone.
- **Public**; Algorithms ignore properties that are not enumerable and only create properties that are enumerable.
- **Defined**; Algorithms treat properties with `undefined` values as if they were not defined at all. 

Take care when using the `in` operator with a descriptor; The `in` operator is aware of non-enumerable properties and so is not well matched for the descriptor abstraction which ignores non-enumerable properties. For example, the `in` operator will return `true` for `toString` for an object literal descriptor. To create a descriptor without any non-enumerable properties use [@kingjs/dictionary](https://www.npmjs.com/package/@kingjs/dictionary). 
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor)

  [family]: https://www.npmjs.com/package/@kingjs/descriptor.family
  [nested]: https://www.npmjs.com/package/@kingjs/descriptor.nested

  [create]: https://www.npmjs.com/package/@kingjs/descriptor.create
  [inherit]: https://www.npmjs.com/package/@kingjs/descriptor.inherit
  [keys]: https://www.npmjs.com/package/@kingjs/descriptor.keys
  [map-names]: https://www.npmjs.com/package/@kingjs/descriptor.map-names
  [merge]: https://www.npmjs.com/package/@kingjs/descriptor.merge
  [path]: https://www.npmjs.com/package/@kingjs/descriptor.path
  [pluck]: https://www.npmjs.com/package/@kingjs/descriptor.pluck
  [scorch]: https://www.npmjs.com/package/@kingjs/descriptor.scorch
