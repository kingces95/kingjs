# @[kingjs][@kingjs]/[poset][ns0].[for-each][ns1]
Invokes a callback on vertices of  a poset such that dependent vertices are called  back first.
## Usage
```js
var forEach = require('@kingjs/poset.for-each');
var assert = require('assert');

// Given a poset (https://en.wikipedia.org/wiki/Partially_ordered_set) 
// where `'a'` depends on `'b'` and `'c'` which, in turn, both depend 
// on `'d'` generate a total ordering like this:

//   a=1
//   / \
// b=2 c=3
//   \ /
//   d=4
var poset = {
  a: [ 'b', 'c' ],
  b: [ 'd' ],
  c: [ 'd' ]
};

var totalOrder = [];

forEach.call(poset, function(vertex) {
  totalOrder.push(vertex);
});

assert(totalOrder.length == 4);
assert(totalOrder[0] == 'd');
assert(totalOrder[3] == 'a');

assert(totalOrder[1] != totalOrder[2]);
assert(totalOrder[1] == 'b' || totalOrder[1] == 'c');
assert(totalOrder[2] == 'b' || totalOrder[2] == 'c');

```

## API
```ts
forEach(this, action, [object Object], roots)
```

### Parameters
- `this`: A poset expressed as an descriptor where  each property represents a named vertex and each  property value is an array of strings each representing  the name of adjacent vertices.
- `action`: Action to take when visiting a vertex.
- `[object Object]`: The name of the vertex being visited.
- `roots`: The vertex or vertices from which to commence  the traversal. If none are provided, all vertices are used as roots.

### Remarks
 - If a cycle is detected, then an exception is  thrown listing the vertices involved in the cycle.
 - Algorithm will _randomly_ decide the direction to  traverse the adjacency vertices. This helps callers ensure  they only rely on dependencies defined in the adjacency  list and not on dependencies  that are artifacts of its  expression. This is why the example in the usage section  may generate two different results.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/poset.for-each
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/dictionary`](https://www.npmjs.com/package/@kingjs/dictionary)|`latest`|
## Source
https://repository.kingjs.net/poset/for-each
## License
MIT

![Analytics](https://analytics.kingjs.net/poset/for-each)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/poset
[ns1]: https://www.npmjs.com/package/@kingjs/poset.for-each
