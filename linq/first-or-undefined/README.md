# @[kingjs][@kingjs]/[linq][ns0].[first-or-undefined][ns1]
Returns the first element of a sequence  that satisfies a specified condition or a undefined.
## Usage
```js
require('kingjs');
var FirstOrUndefined = require('@kingjs/linq.first-or-undefined');
var assert = require('assert');

function readme() {
  assert([0, 1, 2][FirstOrUndefined]() == 0);
  assert([][FirstOrUndefined]() == undefined);
}
readme();

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1; }
  assert([0, 1, 2][FirstOrUndefined](isOdd) == 1);
  assert([0, 2][FirstOrUndefined](isOdd) == undefined);
}
readmePredicate();

```

## API
```ts
firstOrUndefined(predicate)
```

### Parameters
- `predicate`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.first-or-undefined
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/linq.where`](https://www.npmjs.com/package/@kingjs/linq.where)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/first-or-undefined
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/first-or-undefined)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.first-or-undefined
