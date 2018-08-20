# @[kingjs](https://www.npmjs.com/package/kingjs)/[poset][poset].encode
Encodes properties of vertices and their adjacent vertices into a descriptor.
## Usage
Encode a [poset](https://en.wikipedia.org/wiki/Partially_ordered_set) where vertex `'a'` has value `1` and depends on `'b'` and `'c'` which have values `2` and `3` respectively, and both depend on `'d'` which has value `4`, like this:
```js
var encode = require('@kingjs/poset.encode');

//   a=1
//   / \
// b=2 c=3
//   \ /
//   d=4
encode.call({
  a: [ 'b', 'c' ],
  b: [ 'd' ],
  c: [ 'd' ],
}, {
  a: 1,
  b: 2,
  c: 3,
  d: 4
});
```
result:
```js
{
  a$b$c: 1,
  b$d: 2,
  c$d: 3,
  d: 4,
}
```
## API
```ts
declare function encode(
  this: AdjacencyList,
  vertices: VertexProperties
): EncodedPoset
```
### Interfaces
- `EncodedPoset`: see [@kingjs/poset][poset]
- `VertexProperties`: see [@kingjs/poset][poset]
- `AdjacencyList`: see [@kingjs/poset][poset]
### Parameters
- `this`: A descriptor whose properties are vertex names and whose values are vertex properties.
- `edges`: A descriptor whose properties are vertex names and whose values are arrays containing the names of adjacent vertices.
### Returns
Returns a descriptor whose every property name is a join by `'$'` of a vertex name followed by its adjacent vertices.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/poset.encode
```
## License
MIT

![Analytics](https://analytics.kingjs.net/poset/encode)

  [poset]: https://www.npmjs.com/package/@kingjs/poset
