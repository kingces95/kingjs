# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).distinct
Generates a sequence composed of the distinct elements of another sequence.
## Usage
Remove duplicates from the sequence `0`, `0` like this:
```js
var distinct = require('@kingjs/linq.distinct');
var sequence = require('@kingjs/enumerable.create');
var toArray = require('@kingjs/linq.to-array');

var justZero = distinct.call(sequence(0, 0));

toArray.call(justZero);
```
result:
```js
[0]
```
Remove duplicates from a sequence based on an `id` like this:
```js
var distinct = require('@kingjs/linq.distinct');
var sequence = require('@kingjs/enumerable.create');
var toArray = require('@kingjs/linq.to-array');

var enumerable = sequence(
  { id: 0, name: 'foo' },
  { id: 0, name: 'bar' }
);

var justZero = distinct.call(
  enumerable, 
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
function distinct(
  this: Enumerable, 
  selectId?: (x) => any
): Enumerable;
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).

### Parameters
- `this`: The sequence to deduplicate.
- `selectId`: Optional, function to select an identifier.

### Result
Returns a de-duplicated sequence.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/link.distinct
```

## Acknowledgments
Like [`Enumerable.Distinct`](https://msdn.microsoft.com/en-us/library/bb338049(v=vs.110).aspx).

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/distinct)