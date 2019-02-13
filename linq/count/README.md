# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).count
Returns the number of elements in a sequence that satisfy a condition.
## Usage
Count the number of elements in sequence `1`, `2`, `3` like this:
```js
var count = require('@kingjs/linq.count');
require('kingjs');

count.call([1, 2, 3]);
```
result:
```js
3
```
Count the number of odd numbers in sequence `1`, `2`, `3` like this:
```js
var count = require('@kingjs/linq.count');
require('kingjs');

var isOdd = function(o) { return o % 2 == 1; }

count.call([1, 2, 3], isOdd);
```
result:
```js
2
```
## API
```ts
declare function count(
    this: Enumerable,
    predicate?: (x) => boolean
): number
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).

### Parameters
- `this`: The sequence to count values matching predicate.
- `predicate`: To be counted, values must match this predicate. 

### Return Value
Returns the number of values that satisfy the predicate.

## Remarks
By default, the predicate is satisfied by any value.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.count
```

## Acknowledgments
Like [`Enumerable.Count`](https://msdn.microsoft.com/en-us/library/bb535181(v=vs.110).aspx).

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/count)