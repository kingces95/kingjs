# @[kingjs][@kingjs]/[poset][ns0].[inherit][ns1]
Inherits properties of dependent vertices.
## Usage
```js
var inherit = require('@kingjs/poset.inherit');
var assert = require('assert');
var decode = require('@kingjs/poset.decode');

// Create descriptors of the tire counts of `car`, 
//`truck`, and `bigRig` by inheriting common 
// properties from `vehicle` like this:
var decodeAndInherit = function(encodedPoset) {
  var vertices = { };
  var poset = decode.call(encodedPoset, vertices);
  return inherit.call(poset, vertices);
}

var vehicleDescriptors = {
  car$vehicle: { },
  truck$vehicle: { },
  bigRig$vehicle: { tires: 18 },
  vehicle: { tires: 4 }
};

var result = decodeAndInherit(vehicleDescriptors);

assert(Object.keys(result).length == 4);
assert(result.car.tires == 4);
assert(result.truck.tires == 4);
assert(result.bigRig.tires == 18);
assert(result.vehicle.tires == 4);

// Given a poset (https://en.wikipedia.org/wiki/Partially_ordered_set) 
// composed of vertex 
// - `'A'` with property `'a'` that depends on 
// - `'B'` and `'C'` with properties `'b'` and `'c'` respectively and 
// which both depend on 
// - `'D'` with property `'d'`.

// Assume all properties have value `0`. Now, 
// - have `'B'` and `'C'` inherit `'D'`'s properties and 
// - `'A'` inherit `'B'` and `'C'`'s properties
//   - as well as `'D'`'s properties transitively, 

// like this:
var inherit = require('@kingjs/poset.inherit');
var decode = require('@kingjs/poset.decode');

var decodeAndInherit = function(encodedPoset) {
  var vertices = { };
  var poset = decode.call(encodedPoset, vertices);
  return inherit.call(poset, vertices);
}

//     A={a:0}             A={a:0,b:0,c:0,d:0}
//     /     \                   /     \
// B={b:0}  C={c:0}  ->  B={b:0,d:0}  C={c:0,d:0}
//     \     /                   \     /
//     D={d:0}                   D={d:0}
decodeAndInherit({
  A$B$C: { a:0 },
  B$D: { b:0 },
  C$D: { c:0 },
  D: { d:0 },
});

// {
//   A: { a:0, b:0, c:0, d:0 },
//   B: { b:0, d:0 },
//   C: { c:0, d:0 },
//   D: { d:0 }
// }
```

## API
```ts
posetInherit(this, vertices)
```

### Parameters
- `this`: A descriptor whose every property represents  a vertex and whose value is an array of strings representing  the vertex's adjacent vertices.
- `vertices`: A descriptor whose every property  represents a vertex and whose value represents the properties  associated with the vertex.
### Returns
A descriptor with a property for each vertex whose  value is a descriptor which inherits the properties of its  dependent vertices.
### Remarks
Throws if inherited properties that share the same  name do not also have the same value.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/poset.inherit
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/descriptor.inherit`](https://www.npmjs.com/package/@kingjs/descriptor.inherit)|`latest`|
|[`@kingjs/poset.for-each`](https://www.npmjs.com/package/@kingjs/poset.for-each)|`latest`|
## Source
https://repository.kingjs.net/poset/inherit
## License
MIT

![Analytics](https://analytics.kingjs.net/poset/inherit)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/poset
[ns1]: https://www.npmjs.com/package/@kingjs/poset.inherit
