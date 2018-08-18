# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).first-or-undefined
Returns the first element of a sequence that satisfies a specified condition or a undefined.
## Usage
Return the first value of `0`, `1`, `2` like this;
```js
var firstOrUndefined = require('@kingjs/linq.first-or-undefined');
var sequence = require('@kingjs/enumerable.create');

firstOrUndefined.call(sequence(0, 1, 2));
```
result:
```js
0
```
Return the first odd value of `0`, `1`, `2` like this;
```js
var firstOrUndefined = require('@kingjs/linq.first-or-undefined');
var sequence = require('@kingjs/enumerable.create');

var isOdd = function(x) { return x % 2 == 1; }

firstOrUndefined.call(sequence(0, 1, 2), isOdd);
```
result:
```js
1
```

## API
```ts
declare function firstOrUndefined(
  this: Enumerable,
  predicate?: (x) => boolean
)
```

### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).

### Parameters
- `this`: The sequence of which first element is returned.
- `predicate`: Optional predicate element must satisfy. 

### Return Value
First element in the sequence or undefined if sequence is empty. If a predicate is provided, then the first element to match the predicate else undefined if no element satisfies the predicate.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.first-or-undefined
```

## Acknowledgments
Like [`Enumerable.FirstOrDefault`](https://msdn.microsoft.com/en-us/library/bb549039(v=vs.110).aspx).

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/first-or-undefined)