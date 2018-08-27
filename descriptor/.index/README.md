# @[kingjs](https://www.npmjs.com/package/kingjs)/descriptor
Exports all `@kingjs/descriptor.*` functionality in one package.
## Usage
```js
var descriptor = require('@kingjs/descriptor');
```
## Interfaces
```ts
declare interface Descriptor {
  [index: string]: any
}
```
A `descriptor` is an object that is typically expressed as an object literal. This is to say, a `descriptor` is an object whose prototype is the same as the prototype of `{ }`.
## API
### Namespaces
- [`family`][family]
- [`nested`][nested]

### Packages
- [`inherit`][inherit]
- [`mapNames`][map-names]
- [`merge`][merge]
- [`path`][path]
- [`pluck`][pluck]
- [`scorch`][scorch]
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

  [inherit]: https://www.npmjs.com/package/@kingjs/descriptor.inherit
  [map-names]: https://www.npmjs.com/package/@kingjs/descriptor.map-names
  [merge]: https://www.npmjs.com/package/@kingjs/descriptor.merge
  [path]: https://www.npmjs.com/package/@kingjs/descriptor.path
  [pluck]: https://www.npmjs.com/package/@kingjs/descriptor.pluck
  [scorch]: https://www.npmjs.com/package/@kingjs/descriptor.scorch
