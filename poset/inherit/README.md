# @[kingjs](https://www.npmjs.com/package/kingjs)/[poset](https://www.npmjs.com/package/@kingjs/poset).inherit
A terse syntax for creating a set of descriptors with default values.
## Usage
Create descriptors of the tire counts of `car`, `truck`, and `bigRig` by inheriting common properties from `vehicle` like this:

```js
var inherit = require('@kingjs/poset.inherit');

var vehicleDescriptors = {
  car$vehicle: { },
  truck$vehicle: { },
  bigRig$vehicle: { tires: 18 },
  vehicle: { tires: 4 }
};

inherit(vehicleDescriptors);
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
More generally, this algorithm inherits values from dependencies. For example, here is an example you can play with on RunKit: 

Imagine a [poset](https://en.wikipedia.org/wiki/Partially_ordered_set) composed of vertex 
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

//     A={a:0}             A={a:0,b:0,c:0,d:0}
//     /     \                   /     \
// B={b:0}  C={c:0}  ->  B={b:0,d:0}  C={c:0,d:0}
//     \     /                   \     /
//     D={d:0}                   D={d:0}
inherit({
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
  encodedPoset,  
): any

declare function(
  vertices,
  edges
): any
```
### Parameters
- `encodedPoset`: A descriptor:
  - whose every property name, when split on `'$'`, reveals a vertex name followed by its adjacent vertices.
  - whose property values represent the properties associated with the vertex.

or
- `vertices`: A descriptor whose every property represents a vertex and whose value represents the properties associated with the vertex.
- `edges`: A descriptor whose every property represents a vertex and whose value is an array of strings representing the vertex's adjacent vertices.
### Returns
A descriptor with a property for each vertex whose value is a descriptor which inherits the properties of its dependent vertices. 
## Remarks
Throws if inherited properties that share the same name do not also have the same value.
## See Also
- [@kingjs/poset.decode](https://www.npmjs.com/package/@kingjs/poset.decode)
- [@kingjs/poset.for-each](https://www.npmjs.com/package/@kingjs/poset.for-each)
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/poset.inherit
```
## License
MIT

![Analytics](https://analytics.kingjs.net/poset/inherit)
