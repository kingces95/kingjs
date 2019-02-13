# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).sum
Computes the sum of a sequence of numbers projected from elements of a sequence.
## Usage
Sum `1`, `2`, and `3` like this:
```js
var sum = require('@kingjs/linq.sum');
require('kingjs');

var summation = sum.call([1, 2, 3]);
```
result:
```js
6
```

## API
```ts
declare function sum(
  this: Enumerable
): number;
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).
### Parameters
- `this`: The sequence to sum.
### Return Value
The summation of the sequence.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.sum
```
## Acknowledgments
Like [`Element.Sum`](https://msdn.microsoft.com/en-us/library/bb298381(v=vs.110).aspx).
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/sum)