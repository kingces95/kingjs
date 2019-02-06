# @[kingjs][@kingjs]/[assert-shimmed][ns0]
Assert that `kingjs` has been required by the application which means that registered symbols like `@kingjs/IEnumerable.getEnumerator` will have been set on builtin objects like `string` and `array`.
## Usage
```js
var assert = require('assert');

var assertShimmed = () => require('@kingjs/assert-shimmed');
assert.throws(() => assertShimmed());

var IEnumerable = Symbol.for('@kingjs/IEnumerable.getEnumerator');

assert(IEnumerable in Array.prototype == false)
assert(IEnumerable in String.prototype == false)

require('kingjs');
assertShimmed();

assert(IEnumerable in Array.prototype)
assert(IEnumerable in String.prototype)
```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/assert-shimmed
```

## Source
https://repository.kingjs.net/assert-shimmed
## License
MIT

![Analytics](https://analytics.kingjs.net/assert-shimmed)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/assert-shimmed
