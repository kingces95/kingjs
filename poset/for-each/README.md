# @[kingjs](https://www.npmjs.com/package/kingjs)/[poset](https://www.npmjs.com/package/@kingjs/poset).for-each
Invokes a callback on vertices of a poset such that dependent vertices are called back first.
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

forEach.call(poset, function(vertex) {
  totalOrder.push(vertex);
});

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
declare function forEach(
  this: AdjacencyList,
  action: (vertex) => void,
  roots?: string | string[]
)
```
### Interfaces
- `AdjacencyList`: see [@kingjs/poset][poset]
### Parameters
- `this`: A poset expressed as an descriptor where each property represents a named vertex and each property value is an array of strings each representing the name of adjacent vertices. 
- `action`: Action to take when visiting a vertex.
  - `vertex`: The name of the vertex being visited.
- `roots`: The vertex or vertices from which to commence the traversal. If none are provided, all vertices are used as roots. 
## Remarks
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

  [poset]: https://www.npmjs.com/package/@kingjs/poset
  [adjacency list]:(https://en.wikipedia.org/wiki/Adjacency_list