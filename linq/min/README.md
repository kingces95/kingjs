# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).max
Returns the minimum value in a sequence of values projected from elements of a sequence.
## Usage
Return the minimum value of `1`, `2`, `3` like this:
```js
var max = require('@kingjs/linq.max');
var sequence = require('@kingjs/sequence');

max.call(sequence(1, 2, 3));
```
result:
```js
1
```
Return the oldest person like this:
```js
var max = require('@kingjs/linq.max');
var sequence = require('@kingjs/sequence');

var compareAge = function(l, r) { return l.age < r.age; }

max.call(sequence(
  { name: 'Alice', age: 18 },
  { name: 'Bob', age: 18 },
  { name: 'Chris', age: 19 },
), compareAge);
```
result:
```js
{ name: 'Alice', age: 18 }
```
## API
```ts
declare function min(
  this: Enumerable,
  lessThan?: (l, r) => boolean
)
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).
### Parameters
- `this`: Sequence to search for max element.
- `lessThan`: Optional element comparison function.
### Return Value
The minimum element.
## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.min
```

## Acknowledgments
Like [Enumerable.Min](https://msdn.microsoft.com/en-us/library/bb548741(v=vs.110).aspx).

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/min)