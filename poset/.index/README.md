# @[kingjs](https://www.npmjs.com/package/kingjs)/poset
Exports all `@kingjs/poset.*` functionality in one package.
## Usage
```js
var poset = require('@kingjs/poset');
```
## Interfaces
```ts
declare interface EncodedPoset {
  [index: string]: any
}
```
A descriptor whose every property name is a concatenation of a vertex name and its adjacent vertices' names delimited by `$`, and whose every property value contains the properties of the corresponding vertex.
```ts
declare interface AdjacencyList {
  [index: string]: string[]
}
```
A descriptor whose every property name represents a named vertex and whose every property value is an array containing the names of the associated vertices' values.

A vertex found in an adjacency list that has no corresponding property of the same name on the descriptor is still a valid and is simply assumed to have no outbound edges.
```ts
declare interface VertexProperties {
  [index: string]: any
}
```
A descriptor whose every property name a vertex name, and whose every property value contains the properties of the corresponding vertex.
## API
- [`decode`][decode]
- [`encode`][encode]
- [`forEach`][for-each]
- [`inherit`][inherit]
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/poset
```
## License
MIT

![Analytics](https://analytics.kingjs.net/poset)

  [decode]: https://www.npmjs.com/package/@kingjs/poset.decode
  [encode]: https://www.npmjs.com/package/@kingjs/poset.encode
  [for-each]: https://www.npmjs.com/package/@kingjs/poset.for-each
  [inherit]: https://www.npmjs.com/package/@kingjs/poset.inherit