# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).where
Generates a sequence of elements composed of elements from another sequences which satisfy a specified condition.
## Usage
Filter `0`, `1`, `2`, `3` to even numbers like this: 
```js
var where = require('@kingjs/linq.where');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

var numbers = sequence(0, 1, 2, 3);

var isEven = function (x) { return x % 2 == 0; }

var evenNumbers = where.call(numbers, isEven);

toArray.call(evenNumbers);
```
result:
```js
[0, 2]
```
Filter out every other element in `'a'`, `'b'`, `'c'`, `'d'` like this: 
```js
var where = require('@kingjs/linq.where');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

var letters = sequence('a', 'b', 'c', 'd');

var isEvenIndex = function (x, i) { return i % 2 == 0; }

var everyOther = where.call(letters, isEvenIndex);

toArray.call(everyOther);
```
result:
```js
['a', 'c']
```

## API

```ts
declare function where(
  this: Enumerable,
  predicate: (x, i) => boolean,
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).

### Parameters
- `this`: The sequence to filter.
- `predicate`: The filtering predicate.
  - `x`: The value being considered for inclusion.
  - `i`: The index of the value being considered.

### Return Value
A sequence filtered by the predicate.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.where
```

## Acknowledgments
Like [`Enumerable.Where`](https://msdn.microsoft.com/en-us/library/bb549418(v=vs.110).aspx).

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/where)