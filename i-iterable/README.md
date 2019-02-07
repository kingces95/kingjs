# @[kingjs][@kingjs]/[i-iterable][ns0]
`IIterable` has one member `getIterator`.
## Usage
```js
var assert = require('assert');
var IIterable = require('@kingjs/i-iterable');

var Id = Symbol.iterator;
var IInterfaceId = Symbol.for('@kingjs/IInterface.id');

assert(IIterable.name == '@kingjs/IIterable');
assert(IIterable[IInterfaceId] == Id);
assert([] instanceof IIterable);
assert('' instanceof IIterable);
```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/i-iterable
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.create-interface`](https://www.npmjs.com/package/@kingjs/reflect.create-interface)|`^1.0.2`|
## Source
https://repository.kingjs.net/i-iterable
## License
MIT

![Analytics](https://analytics.kingjs.net/i-iterable)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/i-iterable
