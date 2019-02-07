# @[kingjs][@kingjs]/[i-enumerable][ns0]
`IEnumerable` has a single member `getEnumerator`.
## Usage
```js
var assert = require('assert');
var IInterface = require('@kingjs/i-interface');
var IEnumerable = require('@kingjs/i-enumerable');

var id = Symbol.for('@kingjs/IEnumerable.getEnumerator');

assert(IEnumerable instanceof Function);
assert(IEnumerable.name == '@kingjs/IEnumerable');

assert(IEnumerable.getEnumerator == id);
assert(IEnumerable.GetEnumerator == id);
assert(IEnumerable[IInterface.Id] == id);
```





## See Also
- [`@kingjs/reflect.implement-interface`][ImplementInterface]
- [`@kingjs/i-enumerator`][IEnumerator]

[IEnumerator]: https://www.npmjs.com/package/@kingjs/i-enumerator
[ImplementInterface]: https://www.npmjs.com/package/@kingjs/reflect.implement-interface

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/i-enumerable
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.create-interface`](https://www.npmjs.com/package/@kingjs/reflect.create-interface)|`^1.0.2`|
## Source
https://repository.kingjs.net/i-enumerable
## License
MIT

![Analytics](https://analytics.kingjs.net/i-enumerable)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/i-enumerable
