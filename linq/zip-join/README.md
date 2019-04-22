# @[kingjs][@kingjs]/[linq][ns0].[zip-join][ns1]
Selects pairs of values from two ordered  `IEnumerable`'s with matching keys or `null` if there is no match.
## Usage
```js
require('@kingjs/shim')
var ZipJoin = require('@kingjs/linq.zip-join');
var assert = require('assert');
var ToArray = require('@kingjs/linq.to-array');

var outer = [
  { outer: 1, outerName: 'a' },
  { outer: 2, outerName: 'b' },
  { outer: 3, outerName: 'd' },
  { outer: 4, outerName: 'e' },
];

var inner = [
  { inner: -1, innerName: 'b' },
  { inner: -2, innerName: 'c' },
  { inner: -3, innerName: 'd' },
];

var zipJoin = outer
  [ZipJoin](
    inner,
    o => o.outerName,
    o => o.innerName,
    (o, i) => ({ ...o, ...i }),
    (l, r) => l < r
  )
  [ToArray]();

assert.deepEqual(zipJoin, [
  { outer: 1,            outerName: 'a'                 },
  { outer: 2, inner: -1, outerName: 'b', innerName: 'b' },
  {           inner: -2,                 innerName: 'c' },
  { outer: 3, inner: -3, outerName: 'd', innerName: 'd' },
  { outer: 4,            outerName: 'e'                 },
])
```

## API
```ts
zipJoin(this, innerEnumerable, outerKeySelector[, innerKeySelector[, resultSelector(outer, inner, key)[, keyLessThan]]])
```

### Parameters
- `this`: The outer `IEnumerable`.
- `innerEnumerable`: The inner `IEnumerable`.
- `outerKeySelector`: Callback to select the key  from a value pulled from the outer `IEnumerable`.
- `innerKeySelector`: Callback to select the key  from a value pulled from the inner `IEnumerable`. Default uses the `outerKeySelector`.
- `resultSelector`: Callback to select the result given an outer and inner value sharing a key. Default is produces objects of the form `{ outer, inner }`.
  - `outer`: An element from the outer `IEnumerable` or null
  - `inner`: An element from the inner `IEnumerable` or null
  - `key`: A key common to `outer` and `inner` when neither are null
  - Returns the "zipped" value.
- `keyLessThan`: Operator to compare two keys.



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.zip-join
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/linq.empty`](https://www.npmjs.com/package/@kingjs/linq.empty)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/zip-join
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/zip-join)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.zip-join
