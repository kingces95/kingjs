# @[kingjs][@kingjs]/[linq][ns0].[last-or-undefined][ns1]
Returns the last element of a sequence  that satisfies a specified condition or a undefined.
## Usage
```js
require('kingjs');
var LastOrUndefined = require('@kingjs/linq.last-or-undefined');
var assert = require('assert');

function readme() {
  assert([1, 2, 3][LastOrUndefined]() == 3);
  assert([][LastOrUndefined]() == undefined);
}
readme();

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1; }
  assert([0, 1, 2, 3, 4][LastOrUndefined](isOdd) == 3);
  assert([0, 2][LastOrUndefined](isOdd) == undefined);
}
readmePredicate();

```

## API
```ts
lastOrUndefined(predicate)
```

### Parameters
- `predicate`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.last-or-undefined
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/linq.where`](https://www.npmjs.com/package/@kingjs/linq.where)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/last-or-undefined
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/last-or-undefined)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.last-or-undefined
