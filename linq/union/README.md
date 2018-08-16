# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).union
Generates the set union of two sequences.
## Usage
Create a union of the sequences
- `0`, `0`, `1`, `2`, and
- `1`, `3`, `3` 

like this:
```js
var union = require('@kingjs/linq.union');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

var result = union.call(
  sequence(0, 0, 1, 2),
  sequence(1, 3, 3)
);

toArray.call(result);
```
result:
```js
[0, 1, 2, 3]
```
Create a union of the same sequences as before but wrapped in an object like this:
```js
var union = require('@kingjs/linq.union');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

var result = union.call(
  sequence({ id: 0 }, { id: 0 }, { id: 1 }, { id: 2 }),
  sequence({ id: 1 }, { id: 3 }, { id: 3 }),
  function(x) { return x.id; }
);

toArray.call(result);
```
result:
```js
[{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
```
## API
```ts
function union(
  this: Enumerable, 
  second: Enumerable, 
  idSelector?: (x) => any
): Enumerable;
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).
### Parameters
- `this`: The first sequence.
- `second`: The second sequence.
- `idSelector`: Return a value whose stringified representation uniquely identifies an element.
  - `x`: The element to identify.
### Result
A sequence containing unique elements of sequences `first` and `second`.
## Remarks
Elements are deemed equal if their key's stringified representations are the same. 

Elements are included in the order they are appear in the first sequence and then the second sequence.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/link.union
```
## Acknowledgments
Like [`Enumerable.Union`](https://msdn.microsoft.com/en-us/library/bb358407(v=vs.110).aspx).
## License

MIT

![Analytics](https://analytics.kingjs.net/linq/union)