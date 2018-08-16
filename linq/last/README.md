# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).last
Returns the last element of a sequence that satisfies a specified condition.
## Usage
Return the last value of `0`, `1`, `2` like this;
```js
var lastOrUndefined = require('@kingjs/linq.last');
var sequence = require('@kingjs/sequence');

lastOrUndefined.call(sequence(0, 1, 2));
```
result:
```js
2
```
Return the last odd value of `0`, `1`, `2`, `3`, `4` like this;
```js
var lastOrUndefined = require('@kingjs/linq.last');
var sequence = require('@kingjs/sequence');

var isOdd = function(x) { return x % 2 == 1; }

lastOrUndefined.call(sequence(0, 1, 2, 3, 4), isOdd);
```
result:
```js
3
```

## API
```ts
declare function last(
  this: Enumerable,
  predicate?: (x) => boolean
)
```

### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).

### Parameters
- `this`: The sequence of which last element is returned.
- `predicate`: Optional predicate element must satisfy. 

### Return Value
Last element in the sequence or throw if sequence is empty. If a predicate is provided, then the last element to match the predicate else throw if no element satisfies the predicate.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.last
```

## Acknowledgments
Like [`Enumerable.Last`](https://msdn.microsoft.com/en-us/library/bb549138(v=vs.110).aspx).

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/last)