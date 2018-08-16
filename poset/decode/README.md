# @[kingjs](https://www.npmjs.com/package/kingjs)/[poset](https://www.npmjs.com/package/@kingjs/poset).decode
Decodes a descriptor representing a poset into an adjacency list and a vertex property map.

## Usage
Decode an encoded [poset](https://en.wikipedia.org/wiki/Partially_ordered_set) with exported vertices `'a'`, `'b'`, and `'c'` where vertex `'a'` has value `1`, and depends on vertices `'b'` and `'c'` which have values `2` and `3` respectively, and both depend on `'d'` which has value `4`, like this:
```js
var decode = require('@kingjs/poset.decode');

//   a=1
//   / \
// b=2 c=3
//   \ /
//   d=4
decode({
  a$b$c: 1,
  b$d: 2,
  c$d: 3,
  $d: 4,
});
```
result:
```js
{
  vertices: {
    a: 1,
    b: 2,
    c: 3,
    d: 4
  },

  edges: {
    a: [ 'b', 'c' ],
    b: [ 'd' ],
    c: [ 'd' ]
  },
}
```
## API
```ts
declare function decode(
  encodedPoset
): {
  vertices,
  edges: { 
    [index: string] : string[]
  }
}
```
### Parameters
- `encodedPoset`: A descriptor whose property names are a concatenation of a vertex name and its adjacent vertices delimited by `$`. 
### Returns
A descriptor containing two properties:
- `vertices`: a descriptor whose property names represent vertices and whose values represent a vertex's properties. 
- `edges`: a descriptor whose property names represent vertices and whose values are arrays of string representing the names of adjacent vertices.
## Remarks
`decode` allows for terse syntactic descriptions of posets to be decoded so they might be used by more general poset algorithms such as [@kingjs/poset.for-each](https://www.npmjs.com/package/@kingjs/poset.for-each).
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/poset.decode
```
## License
MIT

![Analytics](https://analytics.kingjs.net/poset/decode)
