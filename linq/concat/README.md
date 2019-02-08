# @[kingjs][@kingjs]/[linq][ns0].[concat][ns1]
Concatenates two sequences.
## Usage
```js
require('kingjs')

var assert = require('assert');

var Concat = require('@kingjs/linq.concat');
var { GetEnumerator } = require('@kingjs/i-enumerable');
var { MoveNext, Current } = require('@kingjs/i-enumerator');

var result = [0, 1][Concat]([1, 2]);

var enumerator = result[GetEnumerator]();
assert(enumerator[MoveNext]());
assert(enumerator[Current] == 0);

assert(enumerator[MoveNext]());
assert(enumerator[Current] == 1);

assert(enumerator[MoveNext]());
assert(enumerator[Current] == 1);

assert(enumerator[MoveNext]());
assert(enumerator[Current] == 2);

assert(!enumerator[MoveNext]());
```



### Parameters
- `this`: The first sequence to concatenate.
- `enumerable`: The second sequence to concatenate.
### Returns
An `IEnumerable` that contains the concatenated  elements of the two input sequences.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.concat
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`^1.0.6`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`^1.0.7`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`^1.0.1`|
|[`@kingjs/reflect.implement-i-enumerable`](https://www.npmjs.com/package/@kingjs/reflect.implement-i-enumerable)|`^1.0.0`|
## Source
https://repository.kingjs.net/linq/concat
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/concat)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.concat
