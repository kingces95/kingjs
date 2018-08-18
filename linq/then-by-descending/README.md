# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).then-by-descending
Generates a sequence of elements from a sorted sequence where elements previously considered equal are put in descending order according to a key.
## Usage
Sort `Bob Smith`, `Alice Smith`, and `Chris King` in descending order by last name then first name like this:
```js
var orderByDescending = require('@kingjs/linq.order-by-descending');
var thenByDescending = require('@kingjs/linq.then-by-descending');
var sequence = require('@kingjs/enumerable.create');
var toArray = require('@kingjs/linq.to-array');

var people = sequence(
  { first: 'Bob', last: 'Smith' },
  { first: 'Alice', last: 'Smith' },
  { first: 'Chris', last: 'King' },
);

var lastSelector = function(x) { return x.last; }
var firstSelector = function(x) { return x.first; }

var sortedSequence = orderByDescending.call(people, lastSelector);
sortedSequence = thenByDescending.call(sortedSequence, firstSelector);

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
declare function thenByDescending(
  this: SortedEnumerable, 
  keySelector?: (x) => any,
  lessThan?: (l, r) => boolean,
): SortedEnumerable
```
### Interfaces
- `SortedEnumerable`: See [@kingjs/linq.order-by](https://www.npmjs.com/package/@kingjs/linq.order-by).

### Parameters
- `this`: A sorted sequence of element to subsequently sort.
- `keySelector`: Select a value by which to sort. By default, returns the element.
- `lessThan`: Compare if one key is less than another. By default, uses the `<` operator.
### Return Value
A refined sorted sequence in descending order. 
## See Also
- [@kingjs/linq.order-by](https://www.npmjs.com/package/@kingjs/linq.order-by)
- [@kingjs/linq.order-by-descending](https://www.npmjs.com/package/@kingjs/linq.order-by-descending)
- [@kingjs/linq.then-by](https://www.npmjs.com/package/@kingjs/linq.then-by)
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/link.then-by-descending
```
## Acknowledgments
Like [Enumerable.ThenByDescending](https://msdn.microsoft.com/en-us/library/bb534500(v=vs.110).aspx)
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/then-by-descending)