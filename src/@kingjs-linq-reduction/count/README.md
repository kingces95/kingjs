# @[kingjs][@kingjs]/[linq][ns0].[count][ns1]
Returns the number of elements in a  sequence that satisfy a condition.
## Usage
```js
require('kingjs');
var Count = require('@kingjs/linq.count');
var assert = require('assert');

assert(3 == [1, 2, 3][Count]());

var isOdd = function(o) { return o % 2 == 1; }
assert(2 == [1, 2, 3][Count](isOdd));
```

## API
```ts
count()
```




## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.count
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/linq.aggregate`](https://www.npmjs.com/package/@kingjs/linq.aggregate)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/count
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/count)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.count
