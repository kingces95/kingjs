# @[kingjs][@kingjs]/[linq][ns0].[sum][ns1]
Computes the sum of a sequence of  numbers projected from elements of a sequence.
## Usage
```js
require('kingjs');
var Sum = require('@kingjs/linq.sum');
var assert = require('assert');

function readme() {
  var summation = [1, 2, 3][Sum]();
  assert(summation == 6);
}
readme();

function zero() {
  var summation = [][Sum]();
  assert(summation == 0);
}
zero();
```

## API
```ts
sum()
```




## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.sum
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/linq.aggregate`](https://www.npmjs.com/package/@kingjs/linq.aggregate)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/sum
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/sum)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.sum
