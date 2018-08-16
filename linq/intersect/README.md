# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).intersect
Generates the set intersection of two sequences.
## Usage
Intersect the numbers `0`, `0`, `1`, `2` with the numbers `1`, `0` like this:
```js
var intersect = require('@kingjs/linq.intersect');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

var result = intersect.call(
  sequence(0, 0, 1, 2),
  sequence(1, 0)
)

toArray.call(result);
```
result:
```js
[ 0, 1 ]
```
## API
```ts
declare function intersect(
  this: Enumerable,
  second: Enumerable,
  idSelector?: (x) => any
)
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).
### Parameters
- `this`: The first sequence.
- `second`: The second sequence. 
- `idSelector`: Return a value whose stringified representation uniquely identifies an element.
  - `x`: The element to identify.
### Return Value
A sequence of elements common to both sequences.
## Remarks
Elements are deemed equal if their stringified id representations returned by `idSelector` are the same.

Only unique elements are included in the resulting sequence. 

Elements are included in the order they appear in the first sequence.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.intersect
```
## Acknowledgments
Like [`Enumerable.Intersect`](https://msdn.microsoft.com/en-us/library/bb355408(v=vs.110).aspx).
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/intersect)