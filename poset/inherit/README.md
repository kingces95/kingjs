# @[kingjs](https://www.npmjs.com/package/kingjs)/[poset](https://www.npmjs.com/package/@kingjs/poset).inherit
Inherits properties of dependent vertices.
## Usage
Create descriptors of the tire counts of `car`, `truck`, and `bigRig` by inheriting common properties from `vehicle` like this:

```js
var inherit = require('@kingjs/poset.inherit');
var decode = require('@kingjs/poset.decode');

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

decodeAndInherit(vehicleDescriptors);
```
result:
```js
{
  car: { tires: 4 },
  truck: { tires: 4 },
  bigRig: { tires: 18 },
  vehicle: { tires: 4 }
}
```
Given a [poset](https://en.wikipedia.org/wiki/Partially_ordered_set) composed of vertex 
- `'A'` with property `'a'` that depends on 
- `'B'` and `'C'` with properties `'b'` and `'c'` respectively and which both depend on 
- `'D'` with property `'d'`.

Assume all properties have value `0`. Now, 
- have `'B'` and `'C'` inherit `'D'`'s properties and 
- `'A'` inherit `'B'` and `'C'`'s properties
  - as well as `'D'`'s properties transitively, 

like this:
```js
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
```
result:
```js
{
  A: { a:0, b:0, c:0, d:0 },
  B: { b:0, d:0 },
  C: { c:0, d:0 },
  D: { d:0 }
}
```
## API
```ts
declare function(
  this: AdjacencyList,
  vertices: VertexProperties
): any
```
### Interfaces
- `AdjacencyList`: see [@kingjs/poset][poset]
- `VertexProperties`: see [@kingjs/poset][poset]
### Parameters
- `this`: A descriptor whose every property represents a vertex and whose value is an array of strings representing the vertex's adjacent vertices.
- `vertices`: A descriptor whose every property represents a vertex and whose value represents the properties associated with the vertex.
### Returns
A descriptor with a property for each vertex whose value is a descriptor which inherits the properties of its dependent vertices. 
## Remarks
Throws if inherited properties that share the same name do not also have the same value.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/poset.inherit
```
## License
MIT

![Analytics](https://analytics.kingjs.net/poset/inherit)

  [poset]: https://en.wikipedia.org/wiki/Partially_ordered_set
