# @[kingjs][@kingjs]/[linq][ns0].[sum][ns1]
Computes the sum of a sequence of  numbers projected from elements of a sequence.
## Usage
```js
require('kingjs');
var sum = require('@kingjs/linq.sum');
var assert = require('assert');

function readme() {
  var summation = sum.call([1, 2, 3]);
  assert(summation == 6);
}
readme();

function zero() {
  var summation = sum.call(sequence());
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

## Source
https://repository.kingjs.net/linq/sum
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/sum)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.sum
