# @[kingjs][@kingjs]/[linq][ns0].[first][ns1]
Returns the first element of a sequence  that satisfies a specified condition.
## Usage
```js
require('kingjs');
var First = require('@kingjs/linq.first');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

function readme() {
  assert([0, 1, 2][First]() == 0);
  assertThrows(function() {
    [][First]()
  });
}
readme();

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1; }
  assert([1, 2, 3][First](isOdd) == 1);
  assertThrows(function() {
    [0, 2][First](isOdd)
  });
}
readmePredicate();

```

## API
```ts
first(predicate)
```

### Parameters
- `predicate`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.first
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/linq.where`](https://www.npmjs.com/package/@kingjs/linq.where)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/first
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/first)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.first
