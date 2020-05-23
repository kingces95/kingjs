# @[kingjs][@kingjs]/[linq][ns0].[last][ns1]
Returns the last element of a sequence that  satisfies a specified condition.
## Usage
```js
require('kingjs');
var Last = require('@kingjs/linq.last');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

function readme() {
  assert([1, 2, 3][Last]() == 3);
  assertThrows(function() {
    last.call(sequence())
  });
}
readme();

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1; }
  assert([0, 1, 2, 3, 4][Last](isOdd) == 3);
  assertThrows(function() {
    [0, 2][Last](isOdd)
  });
}
readmePredicate();

```

## API
```ts
last(predicate)
```

### Parameters
- `predicate`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.last
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/linq.where`](https://www.npmjs.com/package/@kingjs/linq.where)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/last
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/last)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.last
