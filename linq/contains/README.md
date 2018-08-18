# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).contains
Returns true if a sequence contains a specified element.
## Usage
Discover if the sequence `1`, `2`, `3` contains the value `2` like this:
```js
var contains = require('@kingjs/linq.contains');
var sequence = require('@kingjs/enumerable.create');

contains.call(sequence(1, 2, 3), 2);
```
result:
```js
true
```
Discover if `'Chris'` is contained in a list of people like this:
```js
var contains = require('@kingjs/linq.contains');
var sequence = require('@kingjs/enumerable.create');

var people = sequence(
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Chris' },
);

var equal = function(l, r) { 
  return l.name == r.name; 
}

contains.call(people, { name: 'Chris' }, equal);
```
result:
```js
true
```
## API

```ts
declare function contains(
  this: Enumerable,
  target: any,
  equal?: (left, right) => boolean
): boolean
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).
 
### Parameters
- `this`: The sequence to search.
- `target`: The value to find.
- `equal`: Optional comparison operator.

### Return Value
Returns `true` if `target` is present, `false` otherwise.

## Remarks
By default, the comparison operator is Javascript's `==` operator.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.contains
```
## Acknowledgments
Like [Enumerable.Contains](https://msdn.microsoft.com/en-us/library/bb339118(v=vs.110).aspx).

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/contains)