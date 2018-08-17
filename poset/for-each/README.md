# @[kingjs](https://www.npmjs.com/package/kingjs)/[poset](https://www.npmjs.com/package/@kingjs/poset).for-each
Perform a depth first walk of a [poset](https://en.wikipedia.org/wiki/Partially_ordered_set) expressed as an [adjacency list](https://en.wikipedia.org/wiki/Adjacency_list).
## Usage
Given a [poset](https://en.wikipedia.org/wiki/Partially_ordered_set) where `'a'` depends on `'b'` and `'c'` which, in turn, both depend on `'d'` generate a total ordering like this:
```js
var forEach = require('@kingjs/poset.for-each');

//    a
//   / \
//  b   c
//   \ /
//    d
var poset = {
  a: [ 'b', 'c' ],
  b: [ 'd' ],
  c: [ 'd' ]
};

var totalOrder = [];

forEach(function(vertex) {
  totalOrder.push(vertex);
}, poset);

totalOrder;
```
result:
```js
[ 'd', 'b', 'c', 'a' ] 
// or
[ 'd', 'c', 'b', 'a' ]
```
## API
```ts
declare function forEachDependent(
  action: (vertex) => void,
  edges: { [index: string] : string[] },
  roots?: string | string[]
)
```
### Parameters
- `action`: Action to take when visiting a vertex.
  - `vertex`: The name of the vertex being visited.
- `edges`: An poset expressed as an descriptor where each property represents a named vertex and each property value is an array of strings each representing the name of adjacent vertices. 
- `roots`: The vertex or vertices from which to commence the traversal. If none are provided, all vertices are used as roots. 
## Remarks
A vertex found in an adjacency list that has no corresponding property of the same name on the poset descriptor is still a valid and is simply assumed to have no outbound edges.

If a cycle is detected, then an exception is thrown listing the vertices involved in the cycle.

Algorithm will _randomly_ decide the direction to traverse the adjacency vertices. This helps callers ensure they only rely on dependencies defined in the adjacency list and not on dependencies  that are artifacts of its expression. This is why the example in the usage section may generate two different results.  
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/poset.for-each
```
## License
MIT

![Analytics](https://analytics.kingjs.net/poset/for-each)
