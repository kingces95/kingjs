# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).skip-while
Generates a sequence identical to another sequence after bypassing the first contiguous set of elements which satisfy a specified condition.
## Usage 
Skip numbers in `-2`, `-1`, `0`, `-1`, `-2` so long as they're negative like this:
```js
var skipWhile = require('@kingjs/linq.skip-while');
var sequence = require('@kingjs/enumerable.create');
var toArray = require('@kingjs/linq.to-array');

function isNegative(x) {
  return x < 0;
}

var result = skipWhile.call(sequence(-2, -1, 0, -1, -2), isNegative);

toArray.call(result);
```
result:
```js
[0, -1, -2]
```
## API
```ts
declare function skipWhile(
  this: Enumerable,
  predicate: function(x, i): boolean
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).

### Parameters
- `this`: The sequence.
- `predicate`: Predicates elements must satisfy in order to continue skipping elements.
  - `x`: The element to test.
  - `i`: The zero based index of the element.

### Return Value
A sequence where the first elements that satisfy `predicate` have been skipped over. 

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.skip-while
```
## Acknowledgments
Like [`Element.SkipWhile`](https://msdn.microsoft.com/en-us/library/bb549288(v=vs.110).aspx).
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/skip-while)