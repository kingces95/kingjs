# @[kingjs](https://www.npmjs.com/package/kingjs)/[enumerable](https://www.npmjs.com/package/@kingjs/enumerable).from-each
Given a descriptor where each property value is an array, generates every combination of descriptors where each property is replaced with an element of its corresponding array.
## Usage
Generate the cross product of shirts sizes (`small`, `medium`, and `large`) and colors (`red` and `green`) like this: 
```js
var fromEach = require('@kingjs/enumerable.from-each');
var toArray = require('@kingjs/linq.to-array');

var shirts = fromEach({
  size: [ 'S', 'M', 'L' ],
  color: [ 'Red', 'Green' ]
});

toArray.call(shirts);
```
results:
```js
[
  { size: 'S', color: 'Red' },
  { size: 'M', color: 'Red' },
  { size: 'L', color: 'Red' },
  { size: 'S', color: 'Green' },
  { size: 'M', color: 'Green' },
  { size: 'L', color: 'Green' }
];
```
Generate the same cross product except use an array instead of a descriptor to express the combinations like this:
```js
var fromEach = require('@kingjs/enumerable.from-each');
var toArray = require('@kingjs/linq.to-array');

var shirts = fromEach([
  [ 'S', 'M', 'L' ], 
  [ 'Red', 'Green' ]
]);

toArray.call(shirts);

```
result:
```js
[
  [ 'S', 'Red' ],
  [ 'M', 'Red' ],
  [ 'L', 'Red' ],
  [ 'S', 'Green' ],
  [ 'M', 'Green' ],
  [ 'L', 'Green' ]
];
``` 
## API

```ts
function fromEach(data): Enumerator
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).
### Parameters
- `data`: An descriptor where the value of every property is an array.
### Return Value
A sequence of descriptors where each property is replaced with an element of its corresponding array.
## Remarks
If `data` is an array or arrays (instead of a descriptor of arrays) then the resulting sequence will be composed of arrays instead of descriptors. Either way, descriptors or arrays, the value of each property (or index) will be drawn from the corresponding `data` array.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/enumerable.from-each
```
## Acknowledgments
Like [nUnit](http://nunit.org/) `ValuesAttribute` and `TheoryAttribute` which use an odometer to generate combinations of test values from a set of arrays. 
## License
MIT

![Analytics](https://analytics.kingjs.net/enumerable/from-each)