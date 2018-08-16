# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).take
Generates a sequence identical to another sequence up to a specified index.
## Usage 
Take the first 2 numbers in `-2`, `-1`, `0`, `1`, `2` like this:
```js
var take = require('@kingjs/linq.take');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

var result = take.call(sequence(-2, -1, 0, 1, 2), 2);

toArray.call(result);
```
result:
```js
[-2, -1]
```
## API
```ts
declare function take(
  this: Enumerable,
  count: number
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).

### Parameters
- `this`: The sequence.
- `count`: The number of elements to take.

### Return Value
A sequence of only the first `count` elements. 

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.take
```
## Acknowledgments
Like [`Element.Take`](https://msdn.microsoft.com/en-us/library/bb503062(v=vs.110).aspx).
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/take)