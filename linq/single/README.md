# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).single
Returns the only element of a sequence that satisfies a specified condition.
## Usage 
Return the single odd number in `0`, `1`, `2` like this:
```js
var singleOrUndefined = require('@kingjs/linq.single-or-default');
var sequence = require('@kingjs/enumerable.create');

function isOdd(x) { 
  return x % 2 == 1; 
}

singleOrUndefined.call(sequence(0, 1, 2), isOdd);
```
result:
```js
1
```
## API
```ts
declare function single(
  this: Enumerable,
  predicate?: function(x): boolean
): any
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).

### Parameters
- `this`: The enumerable to search for a single element.
- `predicate`: The predicate with which to test elements.

### Return Value
A single element that satisfies `predicate` else, if more than one or no element satisfies `predicate`, than throws. 

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.single
```

## Acknowledgments
Like [`Element.Single`](https://msdn.microsoft.com/en-us/library/bb535118(v=vs.110).aspx).

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/single)