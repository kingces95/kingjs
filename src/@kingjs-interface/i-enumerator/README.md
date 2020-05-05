# @[kingjs][@kingjs]/[i-enumerator][ns0]
`IEnumerator` has members `current` and `moveNext`.
## Usage
```js
var assert = require('assert');
var IInterface = require('@kingjs/i-interface');
var IEnumerator = require('@kingjs/i-enumerator');

var MoveNext = Symbol.for('@kingjs/IEnumerator.moveNext');
var Current = Symbol.for('@kingjs/IEnumerator.current');

assert(IEnumerator instanceof Function);
assert(IEnumerator.name == '@kingjs/IEnumerator');

assert(IEnumerator.MoveNext == MoveNext);
assert(IEnumerator.Current == Current);
assert(IEnumerator instanceof IInterface);
```





## See Also
- [`@kingjs/reflect.implement-interface`][ImplementInterface]
- [`@kingjs/i-enumerable`][IEnumerable]

[IEnumerable]: https://www.npmjs.com/package/@kingjs/i-enumerable
[ImplementInterface]: https://www.npmjs.com/package/@kingjs/reflect.implement-interface

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/i-enumerator
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.create-interface`](https://www.npmjs.com/package/@kingjs/reflect.create-interface)|`^1.0.4`|
## Source
https://repository.kingjs.net/i-enumerator
## License
MIT

![Analytics](https://analytics.kingjs.net/i-enumerator)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/i-enumerator
