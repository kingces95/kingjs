# @[kingjs][@kingjs]/[poset][ns0].[decode][ns1]
Decodes a descriptor  representing a poset into an adjacency  list and a vertex property map.
## Usage
```js
var decodePoset = require('@kingjs/poset.decode');
var Dictionary = require('@kingjs/dictionary');
var assert = require('assert');

// Decode an encoded poset (https://en.wikipedia.org/wiki/Partially_ordered_set) 
// with exported vertices `'a'`, `'b'`, and `'c'` where vertex `'a'` has 
// value `1`, and depends on vertices `'b'` and `'c'` which have values `2` 
// and `3` respectively, and both depend on `'d'` which has value `4`, like 
// this:
var vertices = new Dictionary();

//   a=1
//   / \
// b=2 c=3
//   \ /
//   d=4
var edges = decodePoset.call({
  a$b$c: 1,
  b$d: 2,
  c$d: 3,
  d: 4,
}, vertices);

assert(Object.keys(vertices).length == 4);
assert(vertices.a == 1);
assert(vertices.b == 2);
assert(vertices.c == 3);
assert(vertices.d == 4);

assert(Object.keys(edges).length == 3);

assert(edges.a.length == 2);
assert(edges.a[0] == 'b');
assert(edges.a[1] == 'c');

assert(edges.b.length == 1);
assert(edges.b[0] == 'd');

assert(edges.c.length == 1);
assert(edges.c[0] == 'd');
```

## API
```ts
decodeGraph(this, vertices)
```

### Parameters
- `this`: An encoded poset.
- `vertices`: A out descriptor augmented  with vertex properties.
### Returns
An descriptor with a property for  every vertex that has adjacent vertices.  Each property value is an array of names of  the adjacent vertices.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/poset.decode
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/dictionary`](https://www.npmjs.com/package/@kingjs/dictionary)|`latest`|
## Source
https://repository.kingjs.net/poset/decode
## License
MIT

![Analytics](https://analytics.kingjs.net/poset/decode)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/poset
[ns1]: https://www.npmjs.com/package/@kingjs/poset.decode
