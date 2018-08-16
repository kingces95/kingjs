# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).order-by
Generates a sequence of elements in ascending order according to a key.
## Usage
Sort the numbers `1`, `0`, `2` like this:
```js
var orderBy = require('@kingjs/linq.order-by');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

var numbers = sequence(1, 0, 2);

var result = orderBy.call(numbers);

toArray.call(result);
```
result:
```js
[0, 1, 2]
```
Sort the same numbers as before, but now wrapped in objects, like this:
```js
var orderBy = require('@kingjs/linq.order-by');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

var numbers = sequence({ value: 1 }, { value: 0 }, { value: 2 });
var keySelector = function(x) { return x.value; };

var result = orderBy.call(numbers, keySelector);

toArray.call(result);
```
result:
```js
[{ value: 0 }, { value: 1 }, { value: 2 }]
```
Sort the numbers `1`, `0`, `2` and letters `b`, `a` so letters come first like this:
```js
var orderBy = require('@kingjs/linq.order-by');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

var numbers = sequence(1, 0, 2, `b`, `a`);
var keySelector = null;
var lessThan = function(l, r) {
  if (typeof l != typeof r)
    return typeof l == 'string';
  return l < r;
};

var result = orderBy.call(numbers, keySelector, lessThan);

toArray.call(result);
```
result:
```js
['a', 'b', 0, 1, 2]
```
Sort `Bob Smith`, `Alice Smith`, and `Chris King` by last name then first name like this:
```js
var orderBy = require('@kingjs/linq.order-by');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

var people = sequence(
  { first: 'Bob', last: 'Smith' },
  { first: 'Alice', last: 'Smith' },
  { first: 'Chris', last: 'King' },
);

var lastSelector = function(x) { return x.last; }
var firstSelector = function(x) { return x.first; }

var sortedSequence = orderBy
  .call(people, lastSelector)
  .createOrderedEnumerable(firstSelector);

toArray.call(sortedSequence);
```
result:
```js
[
  { first: 'Chris', last: 'King' },
  { first: 'Alice', last: 'Smith' },
  { first: 'Bob', last: 'Smith' },
]
```
## API
```ts
declare function orderBy(
  this: Enumerable, 
  keySelector?: (x) => any,
  lessThan?: (l, r) => boolean,
  descending?: boolean
): SortedEnumerable

declare interface SortedEnumerable extends Enumerable {
  createOrderedEnumerable(
    keySelector?: (x) => any,
    lessThan?: (l, r) => boolean,
    descending?: boolean
  ): SortedEnumerable
}
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).
- `SortedEnumerable`: Allows further sorting of elements that have  compared equal thus far. The arguments have the same semantics as the `OrderBy` arguments. 

### Parameters
- `this`: A sequence of element to sort.
- `keySelector`: Select a value by which to sort. By default, returns the element.
- `lessThan`: Compare if one key is less than another. By default, uses the `<` operator.
- `descending`: If `true`, then sorts in descending order. Default is `false`.
### Return Value
A sorted sequence. 
## See Also
- [@kingjs/linq.order-by-descending](https://www.npmjs.com/package/@kingjs/linq.order-by-descending)
- [@kingjs/linq.then-by](https://www.npmjs.com/package/@kingjs/linq.then-by)
- [@kingjs/linq.then-by-descending](https://www.npmjs.com/package/@kingjs/linq.then-by-descending)
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/link.order-by
```
## Acknowledgments
Like [Enumerable.OrderBy](https://msdn.microsoft.com/en-us/library/bb549422(v=vs.110).aspx)
## License 
MIT

![Analytics](https://analytics.kingjs.net/linq?pixel/order-by&useReferer)