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
- [`freeze`][freeze]
- [`isFrozen`][is-frozen]
- [`normalize`][normalize]
- [`remove`][remove]
- [`keys`][keys]
- [`slice`][slice]
- [`write`][write]

- [`filter`][filter]
- [`inherit`][inherit]
- [`merge`][merge]
- [`mergeWildcards`][merge-wildcards]
- [`reduce`][reduce]
- [`scorch`][scorch]
- [`update`][update]

## Remarks
A `descriptor` is
- **Data**; Functions are not meant to be invoked from a descriptor (except for the default `Array` operations). Algorithms do not create accessor properties nor make allowance for accessor properties.
- **Flat**; Algorithms do not differentiate between between inherited and own properties.
- **Anonymous**; Two descriptors are equal if they have the same properties with the same values. 
- **Piped**; Algorithms that could reasonably be construed to operate on a descriptor accept the descriptor as `this` and strive to return the descriptor a clone.
- **Potentially Frozen, Optionally immutable**; Algorithms anticipate that a descriptor may be frozen and in which case they'll clone before writing to the object. 
- **Public**; Algorithms ignore properties that are not enumerable and only create properties that are enumerable.
- **Named**; Descriptors are paired with names passed out of band from the descriptor. `Object.DefineProperty` and `Object.DefineProperties` exemplify separation of a descriptor's name from its properties. 

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

  [filter]: https://www.npmjs.com/package/@kingjs/descriptor.filter
  [freeze]: https://www.npmjs.com/package/@kingjs/descriptor.freeze
  [inherit]: https://www.npmjs.com/package/@kingjs/descriptor.inherit
  [is-frozen]: https://www.npmjs.com/package/@kingjs/descriptor.is-frozen
  [keys]: https://www.npmjs.com/package/@kingjs/descriptor.keys
  [merge]: https://www.npmjs.com/package/@kingjs/descriptor.merge
  [merge-wildcards]: https://www.npmjs.com/package/@kingjs/descriptor.merge-wildcards
  [normalize]: https://www.npmjs.com/package/@kingjs/descriptor.normalize
  [reduce]: https://www.npmjs.com/package/@kingjs/descriptor.reduce
  [remove]: https://www.npmjs.com/package/@kingjs/descriptor.remove
  [scorch]: https://www.npmjs.com/package/@kingjs/descriptor.scorch
  [update]: https://www.npmjs.com/package/@kingjs/descriptor.update
  [write]: https://www.npmjs.com/package/@kingjs/descriptor.write
