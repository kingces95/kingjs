# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).all
Returns true if all elements of a sequence satisfy a condition.
## Usage
Test if all the numbers 0, 1, and 2, are less than 3 like this:

```js
var all = require('@kingjs/linq.all');
var sequence = require('@kingjs/sequence');

var enumerable = sequence(0, 1, 2);

all.call(enumerable,
  function(o) { return o < 3; }
);
```
result:
```js
true
```
## API
```ts
declare function all(
  this: Enumerable,
  predicate?: (x) => boolean
): boolean
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).

### Parameters
- `this`: A sequence of values. 
- `predicate` The predicate values are tested against.

### Return Value
Returns `true` if `predicate` is `true` for all values, otherwise, `false`.

## Remarks
Calling `all` on an empty sequence returns `true`. 

The default `predicate` returns `true` for every value.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.all
```

## Acknowledgments
Like [Enumerable.All](https://msdn.microsoft.com/en-us/library/bb548541(v=vs.110).aspx)

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/all)