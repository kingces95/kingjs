# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).take-while
Generates a sequence identical to another sequence so long as the elements continue to satisfy a specified condition.
## Usage
Take numbers in `-2`, `-1`, `0`, `-1`, `-2` so long as they're negative like this:
```js
var takeWhile = require('@kingjs/linq.take-while');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

function isNegative(x) {
  return x < 0;
}

var result = take.call(sequence(-2, -1, 0, -1, -2), isNegative);

toArray.call(result);
```
result:
```js
[-2, -1]
```
## API
```ts
declare function takeWhile(
  this: Enumerable,
  predicate: function(x, i): boolean
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).

### Parameters
- `this`: The sequence.
- `predicate`: Predicates elements must satisfy in order to continue taking elements.
  - `x`: The element to test.
  - `i`: The zero based index of the element.

### Return Value
A sequence where of first elements of `this` that satisfy `predicate`. 

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.take-while
```
## Acknowledgments
Like [`Element.TakeWhile`](https://msdn.microsoft.com/en-us/library/bb548775(v=vs.110).aspx).
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/take-while)