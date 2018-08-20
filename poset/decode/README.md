# @[kingjs](https://www.npmjs.com/package/kingjs)/[poset][poset].decode
Decodes a descriptor representing a poset into an adjacency list and a vertex property map.

## Usage
Decode an encoded [poset](https://en.wikipedia.org/wiki/Partially_ordered_set) with exported vertices `'a'`, `'b'`, and `'c'` where vertex `'a'` has value `1`, and depends on vertices `'b'` and `'c'` which have values `2` and `3` respectively, and both depend on `'d'` which has value `4`, like this:
```js
var decode = require('@kingjs/poset.decode');

var vertices = { };
//   a=1
//   / \
// b=2 c=3
//   \ /
//   d=4
var result = {
  edges: decode.call({
    a$b$c: 1,
    b$d: 2,
    c$d: 3,
    d: 4,
  }, vertices),
  
  vertices: vertices
}
```
result:
```js
{
  edges: {
    a: [ 'b', 'c' ],
    b: [ 'd' ],
    c: [ 'd' ]
  },

  vertices: {
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }
}
```
## API
```ts
declare function decode(
  this: EncodedPoset,
  vertices: VertexProperties
): AdjacencyList
```
### Interfaces
- `EncodedPoset`: see [@kingjs/poset][poset]
- `VertexProperties`: see [@kingjs/poset][poset]
- `AdjacencyList`: see [@kingjs/poset][poset]
### Parameters
- `this`: An encoded poset.
- `vertices`: A out descriptor augmented with vertex properties.
### Returns
An descriptor with a property for every vertex that has adjacent vertices. Each property value is an array of names of the adjacent vertices. 
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/poset.decode
```
## License
MIT

![Analytics](https://analytics.kingjs.net/poset/decode)

  [poset]: https://www.npmjs.com/package/@kingjs/poset