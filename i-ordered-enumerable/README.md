# @[kingjs][@kingjs]/[i-ordered-enumerable][ns0]
`IOrderedEnumerable` has a single member `createOrderedEnumerable`.
## Usage
```js
var assert = require('assert');
var IInterface = require('@kingjs/i-interface');
var IEnumerable = require('@kingjs/i-ordered-enumerable');

var id = Symbol.for('@kingjs/IEnumerable.getEnumerator');

assert(IEnumerable instanceof Function);
assert(IEnumerable.name == '@kingjs/IEnumerable');

assert(IEnumerable.getEnumerator == id);
assert(IEnumerable.GetEnumerator == id);
assert(IEnumerable instanceof IInterface);
```





## See Also
- [`@kingjs/reflect.implement-interface`][ImplementInterface]
- [`@kingjs/i-enumerator`][IEnumerator]

[IEnumerator]: https://www.npmjs.com/package/@kingjs/i-enumerator
[ImplementInterface]: https://www.npmjs.com/package/@kingjs/reflect.implement-interface

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/i-ordered-enumerable
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/reflect.create-interface`](https://www.npmjs.com/package/@kingjs/reflect.create-interface)|`latest`|
## Source
https://repository.kingjs.net/i-ordered-enumerable
## License
MIT

![Analytics](https://analytics.kingjs.net/i-ordered-enumerable)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/i-ordered-enumerable
