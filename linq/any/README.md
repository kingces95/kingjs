# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).any
Returns true if any element of a sequence satisfies a condition.
## Usage
Test if any the numbers `0`, `1`, or `2`, equal `2` like this:

```js
var any = require('@kingjs/linq.any');
var sequence = require('@kingjs/sequence');

var enumerable = sequence(0, 1, 2);

any.call(enumerable,
  function(o) { return o == 2; }
);
```
result:
```js
true
```

## API

```ts
declare function any(
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
Returns `true` if `predicate` is `true` for any value, otherwise, `false`.

## Remarks
Calling `all` on an empty sequence returns `false`. 

The default `predicate` returns `true` for every value.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.any
```

## Acknowledgments
Like [Enumerable.Any](https://msdn.microsoft.com/en-us/library/bb337697(v=vs.110).aspx)

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/any)
