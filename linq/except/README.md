# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).except
Generates the set difference of two sequences.
## Usage
Remove duplicates from the sequence `0`, `0`, `1`, `2` and also exclude values `1` and `2` like this:
```js
var except = require('@kingjs/linq.except');
var sequence = require('@kingjs/enumerable.create');
var toArray = require('@kingjs/linq.to-array');

var justZero = except.call(
  sequence(0, 0, 1, 2),
  sequence(1, 2)
);

toArray.call(justZero);
```
result:
```js
[0]
```
Remove duplicates from a sequence based on an `id` and also exclude those with `id` equal to `1` like this:
```js
var distinct = require('@kingjs/linq.distinct');
var sequence = require('@kingjs/enumerable.create');
var toArray = require('@kingjs/linq.to-array');

var enumerable = sequence(
  { id: 0, name: 'foo' },
  { id: 0, name: 'bar' }
  { id: 1, name: 'baz' }
);

var justZero = except.call(
  enumerable,
  sequence({ id: 1, name: 'moo' }),
  function(x) { return x.id; }
);

toArray.call(justZero);
```
result:
```js
[{ 
  id: 0,
  name: 'foo'
}]
```

## API
```ts
function except(
  this: Enumerable, 
  exceptions: Enumerable, 
  idSelector?: (x) => any
): Enumerable;
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).

### Parameters
- `this`: The first sequence.
- `exceptions`: The second sequence.
- `idSelector`: Return a value whose stringified representation uniquely identifies an element.
  - `x`: The element to identify.

### Result
Returns elements in the first sequence except those also present in the second sequence.
## Remarks
Elements are deemed equal if their stringified id representations returned by `idSelector` are the same.

Only unique elements are included in the resulting sequence. 

Elements are included in the order they appear in the first sequence.
## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/link.exclude
```

## Acknowledgments
Like [`Enumerable.Exclude`](https://msdn.microsoft.com/en-us/library/bb336390(v=vs.110).aspx).

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/except)