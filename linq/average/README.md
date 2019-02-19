# @[kingjs][@kingjs]/[linq][ns0].[average][ns1]
Returns the average value of a sequence of  numbers projected from elements of a sequence.
## Usage
```js
require('kingjs')
var assert = require('assert');
var Average = require('@kingjs/linq.average');

function test(array, result) {
  assert(array[Average]() == result);
}

test([2], 2);
test([1, 2, 3], 2);
test([-2, 0, 2], 0);

var empty = [];
assert(Number.isNaN(empty[Average]()));

assert(
  [{ value: -1 }, { value: 1 }][Average](
    function (x) { return x.value; }
  ) == 0
)
```

## API
```ts
average()
```




## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.average
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/linq.aggregate`](https://www.npmjs.com/package/@kingjs/linq.aggregate)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/average
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/average)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.average
