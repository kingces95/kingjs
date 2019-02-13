# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).last-or-undefined
Returns the last element of a sequence that satisfies a specified condition or a undefined.
## Usage
Return the last value of `0`, `1`, `2` like this;
```js
var lastOrUndefined = require('@kingjs/linq.last-or-undefined');
require('kingjs');

lastOrUndefined.call([1, 2, 3]);
```
result:
```js
2
```
Return the last odd value of `0`, `1`, `2`, `3`, `4` like this;
```js
var lastOrUndefined = require('@kingjs/linq.last-or-undefined');
require('kingjs');

var isOdd = function(x) { return x % 2 == 1; }

lastOrUndefined.call(sequence(0, 1, 2, 3, 4), isOdd);
```
result:
```js
3
```

## API
```ts
declare function lastOrUndefined(
  this: Enumerable,
  predicate?: (x) => boolean
)
```

### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).

### Parameters
- `this`: The sequence of which last element is returned.
- `predicate`: Optional predicate element must satisfy. 

### Return Value
Last element in the sequence or undefined if sequence is empty. If a predicate is provided, then the last element to match the predicate else undefined if no element satisfies the predicate.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.last-or-undefined
```

## Acknowledgments
Like [`Enumerable.LastOrDefault`](https://msdn.microsoft.com/en-us/library/bb548915(v=vs.110).aspx).

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/last-or-undefined)