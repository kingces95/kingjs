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
- [`mapNames`][map-names]
- [`pluck`][pluck]
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor)

  [map-names]: https://www.npmjs.com/package/@kingjs/descriptor.map-names
  [pluck]: https://www.npmjs.com/package/@kingjs/descriptor.pluck
