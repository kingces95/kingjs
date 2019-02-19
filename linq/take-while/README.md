# @[kingjs][@kingjs]/[linq][ns0].[take-while][ns1]
Generates a sequence identical to another  sequence so long as the elements continue to satisfy  a specified condition.
## Usage
```js
require('kingjs');
var takeWhile = require('@kingjs/linq.take-while');
var assert = require('assert');
var toArray = require('@kingjs/linq.to-array');

function readme() {
  function isNegative(x) { return x < 0; };

  var result = takeWhile.call(sequence(-2, -1, 0, -1, -2), isNegative);
  var array = toArray.call(result);

  assert(array.length == 2);
  assert(array[0] == -2);
  assert(array[1] == -1);
}
readme();

function isFirstTwo(x, i) { return i < 2; };

var result = takeWhile.call(sequence(-2, -1, 0, -1, -2), isFirstTwo);
var array = toArray.call(result);

assert(array.length == 2);
assert(array[0] == -2);
assert(array[1] == -1);
```

## API
```ts
takeWhile(predicate)
```

### Parameters
- `predicate`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.take-while
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/reflect.implement-i-enumerable`](https://www.npmjs.com/package/@kingjs/reflect.implement-i-enumerable)|`latest`|
## Source
https://repository.kingjs.net/linq/take-while
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/take-while)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.take-while
