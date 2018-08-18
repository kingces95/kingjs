# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).order-by-descending
Generates a sequence of elements in descending order according to a key.
## Usage
Sort in descending order the numbers `1`, `0`, `2` in descending order like this:
```js
var orderByDescending = require('@kingjs/linq.order-by-descending');
var sequence = require('@kingjs/enumerable.create');
var toArray = require('@kingjs/linq.to-array');

var numbers = sequence(1, 0, 2);

var result = orderByDescending.call(numbers);

toArray.call(result);
```
result:
```js
[2, 1, 0]
```
Sort in descending order the same numbers as before, but now wrapped in objects, like this:
```js
var orderByDescending = require('@kingjs/linq.order-by-descending');
var sequence = require('@kingjs/enumerable.create');
var toArray = require('@kingjs/linq.to-array');

var numbers = sequence({ value: 1 }, { value: 0 }, { value: 2 });
var keySelector = function(x) { return x.value; };

var result = orderByDescending.call(numbers, keySelector);

toArray.call(result);
```
result:
```js
[{ value: 2 }, { value: 1 }, { value: 0 }]
```
Sort in descending order the numbers `1`, `0`, `2` and letters `b`, `a` so letters compare less than numbers like this:
```js
var orderBy = require('@kingjs/linq.order-by');
var sequence = require('@kingjs/enumerable.create');
var toArray = require('@kingjs/linq.to-array');

var numbers = sequence(1, 0, 2, `b`, `a`);
var keySelector = null; // use default
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
Sort `Bob Smith`, `Alice Smith`, and `Chris King` in descending order by last name then first name like this:
```js
var orderBy = require('@kingjs/linq.order-by');
var sequence = require('@kingjs/enumerable.create');
var toArray = require('@kingjs/linq.to-array');

var people = sequence(
  { first: 'Bob', last: 'Smith' },
  { first: 'Alice', last: 'Smith' },
  { first: 'Chris', last: 'King' },
);

var lastSelector = function(x) { return x.last; }
var firstSelector = function(x) { return x.first; }
var lessThan = null; // use default

var sortedSequence = orderByDescending
  .call(people, lastSelector)
  .createOrderedEnumerable(firstSelector, lessThan, true);

toArray.call(sortedSequence);
```
result:
```js
[
  { first: 'Bob', last: 'Smith' },
  { first: 'Alice', last: 'Smith' },
  { first: 'Chris', last: 'King' },
]
```
## API
```ts
declare function orderByDescending(
  this: Enumerable, 
  keySelector?: (x) => any,
  lessThan?: (l, r) => boolean,
): SortedEnumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).
- `SortedEnumerable`: See [@kingjs/linq.order-by](https://www.npmjs.com/package/@kingjs/linq.order-by).

### Parameters
- `this`: A sequence of element to sort.
- `keySelector`: Select a value by which to sort. By default, returns the element.
- `lessThan`: Compare if one key is less than another. By default, uses the `<` operator.
### Return Value
A sorted sequence in descending order. 
## See Also
- [@kingjs/linq.order-by](https://www.npmjs.com/package/@kingjs/linq.order-by)
- [@kingjs/linq.then-by](https://www.npmjs.com/package/@kingjs/linq.then-by)
- [@kingjs/linq.then-by-descending](https://www.npmjs.com/package/@kingjs/linq.then-by-descending)
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/link.order-by-descending
```
## Acknowledgments
Like [Enumerable.OrderByDescending](https://msdn.microsoft.com/en-us/library/bb548916(v=vs.110).aspx)
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/order-by-descending)