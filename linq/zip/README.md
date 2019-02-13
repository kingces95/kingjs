# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).zip
Generates a sequence of elements composed of elements of two sequences which share the same index.
## Usage
Zip the numbers `0`, `1`, `2` with the letters `a`, `b` like this:
```js
var zip = require('@kingjs/linq.zip');
require('kingjs');
var toArray = require('@kingjs/linq.to-array');

var result = zip.call(
  [1, 2, 3],
  sequence(`a`, `b`),
  function(n, l) { 
    return { number: n, letter: l }; 
  }
)

toArray.call(result);
```
result:
```js
[
  { number: 0, letter: 'a' },
  { number: 1, letter: 'b' }
]
```
## API
```ts
declare function zip(
  this: Enumerable,
  second: Enumerable,
  resultSelector: (firstElement, secondElement) => any
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).
### Parameters
- `this`: The first sequence.
- `second`: The second sequence. 
- `resultSelector`: Joins elements of the first and second sequence which share the same index.
  - `firstElement`: Element of the first sequence.
  - `secondElement`: Element of the second sequence.
### Return Value
A sequence of elements of first sequence joined with elements of the second sequence.
## Remarks
Elements without a partner are ignored.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.zip
```
## Acknowledgments
Like [`Enumerable.Zip`](https://msdn.microsoft.com/en-us/library/dd267698(v=vs.110).aspx).
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/zip)