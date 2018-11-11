# @[kingjs](https://www.npmjs.com/package/kingjs)/descriptor
Exports all `@kingjs/descriptor.*` functionality in one package.
## Usage
```js
var descriptor = require('@kingjs/descriptor');
```
## Interfaces
A `descriptor` is an object or array literal or [`Dictionary`][dictionary] with only enumerable properties.
```ts
declare interface Descriptor {
  [index: string | number]: any
}
```
## Namespaces
- [`family`][family]
- [`nested`][nested]

## Packages
These packages all take a descriptor as `this` and will clone on write if they need to change a property value.

- [`filter`][filter]
- [`inherit`][inherit]
- [`keys`][keys]
- [`merge`][merge]
- [`mergeWildcards`][merge-wildcards]
- [`normalize`][normalize]
- [`reduce`][reduce]
- [`scorch`][scorch]
- [`update`][update]

## Packages (Internal)
These packages can be used to implement a descriptor transform. 

- [`clone`][clone]
- [`freeze`][freeze]
- [`isFrozen`][is-frozen]
- [`remove`][remove]
- [`writableSymbol`][writable-symbol]
- [`write`][write]

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor)

  [dictionary]: https://www.npmjs.com/package/@kingjs/dictionary

  [family]: https://www.npmjs.com/package/@kingjs/descriptor.family
  [nested]: https://www.npmjs.com/package/@kingjs/descriptor.nested
  
  [filter]: https://www.npmjs.com/package/@kingjs/descriptor.filter
  [inherit]: https://www.npmjs.com/package/@kingjs/descriptor.inherit
  [keys]: https://www.npmjs.com/package/@kingjs/descriptor.keys
  [merge]: https://www.npmjs.com/package/@kingjs/descriptor.merge
  [merge-wildcards]: https://www.npmjs.com/package/@kingjs/descriptor.merge-wildcards
  [normalize]: https://www.npmjs.com/package/@kingjs/descriptor.normalize
  [reduce]: https://www.npmjs.com/package/@kingjs/descriptor.reduce
  [scorch]: https://www.npmjs.com/package/@kingjs/descriptor.scorch
  [update]: https://www.npmjs.com/package/@kingjs/descriptor.update

  [clone]: https://www.npmjs.com/package/@kingjs/descriptor.clone
  [freeze]: https://www.npmjs.com/package/@kingjs/descriptor.freeze
  [is-frozen]: https://www.npmjs.com/package/@kingjs/descriptor.is-frozen
  [remove]: https://www.npmjs.com/package/@kingjs/descriptor.remove
  [writable-symbol]: https://www.npmjs.com/package/@kingjs/descriptor.writable-symbol
  [write]: https://www.npmjs.com/package/@kingjs/descriptor.write
