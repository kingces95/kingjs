# @[kingjs][@kingjs]/[i-ordered-enumerable][ns0]
`IOrderedEnumerable` extends `IEnumerable` with  a single member  `createOrderedEnumerable`.
## Usage
```js
var assert = require('assert');
var IInterface = require('@kingjs/i-interface');
var IEnumerable = require('@kingjs/i-enumerable');
var IOrderedEnumerable = require('@kingjs/i-ordered-enumerable');

var id = Symbol.for('@kingjs/IOrderedEnumerable.createOrderedEnumerable');

assert(IOrderedEnumerable instanceof Function);
assert(IOrderedEnumerable.name == '@kingjs/IOrderedEnumerable');

assert(IOrderedEnumerable.getEnumerator == IEnumerable.getEnumerator);
assert(IOrderedEnumerable.GetEnumerator == IEnumerable.getEnumerator);
assert(IOrderedEnumerable.createOrderedEnumerable == id);
assert(IOrderedEnumerable instanceof IInterface);
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
