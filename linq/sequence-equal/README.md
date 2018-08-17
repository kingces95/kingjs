# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).sequence-equal
Returns true if two sequences contain the same number of elements and those that share the same index are equal.
## Usage
Test if `[1,2,3]` is equal to other arrays like this:
```js
var sequenceEqual = require('@kingjs/link.sequence-equal');
var sequence = require('@kingjs/enumerable.create');

var expected = sequence(1, 2, 3);

var toFew = sequence(1, 2);
var tooMany = sequence(1, 2, 3, 4);
var wrongOrder = sequence(3, 2, 1);
var justRight = sequence(1, 2, 3);

var result = {
  tooFew: sequenceEqual(expected, toFew),
  tooMany: sequenceEqual(expected, tooMany),
  wrongOrder: sequenceEqual(expected, wrongOrder),
  justRight: sequenceEqual(expected, justRight),
};
```

returns:
```js
{
  tooFew: false,
  tooMany: false,
  wrongOrder: false,
  justRight: true
}
```

## API
```ts
declare function sequenceEqual(
    this: Enumerable,
    target: Enumerable,
    equal?: (left, right) => boolean
): boolean
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).

### Parameters
- `this`: the first sequence being compared
- `target`: the second sequence being compared
- `equal`: optional equality predicate.

### Return Value
`true` if both sequences have the same number of elements and corresponding elements compare `==`, otherwise `false`.

## Remarks
The default value for `equal` is exposed by `@kingjs/linq`.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.sequence-equal
```

## Acknowledgments
Like [Enumerable.SequenceEqual](https://msdn.microsoft.com/en-us/library/bb342073(v=vs.110).aspx)

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/sequence-equal)