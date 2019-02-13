# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).skip
Generates a sequence identical to another sequence after bypassing a specified number of elements.
## Usage 
Skip the first 2 numbers in `-1`, `-1`, `0`, `1`, `2` like this:
```js
var skip = require('@kingjs/linq.skip');
require('kingjs');
var toArray = require('@kingjs/linq.to-array');

var result = skip.call(sequence(-2, -1, 0, 1, 2), 2);

toArray.call(result);
```
result:
```js
[0, 1, 2]
```
## API
```ts
declare function skip(
  this: Enumerable,
  count: number
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).

### Parameters
- `this`: The sequence.
- `count`: The number of elements to skip.

### Return Value
A sequence where the first `count` elements have been skipped over. 

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.skip
```
## Acknowledgments
Like [`Element.Skip`](https://msdn.microsoft.com/en-us/library/bb358985(v=vs.110).aspx).
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/skip)