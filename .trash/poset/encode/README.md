# @[kingjs][@kingjs]/[poset][ns0].[encode][ns1]
Encodes an adjacency list and vertex  property map into a descriptor whose property  names, when split on `$`, reveal a vertex name  followed by its adjacent vertices, and whose property  values correspond to vertex properties.
## Usage
```js
var encodePoset = require('@kingjs/poset.encode');
var assert = require('assert');

// Encode a poset (https://en.wikipedia.org/wiki/Partially_ordered_set) 
// where vertex `'a'` has value `1` and depends on `'b'` and `'c'` which 
// have values `2` and `3` respectively, and both depend on `'d'` which 
// has value `4`, like this:

//   a=1
//   / \
// b=2 c=3
//   \ /
//   d=4
var poset = encodePoset.call({
  a: [ 'b', 'c' ],
  b: [ 'd' ],
  c: [ 'd' ],
}, {
  a: 1,
  b: 2,
  c: 3,
  d: 4
});

assert(Object.keys(poset).length == 4);
assert(poset.a$b$c == 1);
assert(poset.b$d == 2);
assert(poset.c$d == 3);
assert(poset.d == 4);
```

## API
```ts
encodePoset(this, vertices)
```

### Parameters
- `this`: A descriptor whose properties are  vertex names and whose values are vertex properties.
- `vertices`: A descriptor whose properties are vertex names and whose values are arrays containing  the names of adjacent vertices.
### Returns
Returns a descriptor whose every property name  is a join by `'$'` of a vertex name followed by its  adjacent vertices.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/poset.encode
```

## Source
https://repository.kingjs.net/poset/encode
## License
MIT

![Analytics](https://analytics.kingjs.net/poset/encode)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/poset
[ns1]: https://www.npmjs.com/package/@kingjs/poset.encode
