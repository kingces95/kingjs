# @[kingjs][@kingjs]/[linq][ns0].[skip][ns1]
Generates a sequence identical to another sequence  after bypassing a specified number of elements.
## Usage
```js
require('kingjs');
var assert = require('assert');
var Skip = require('@kingjs/linq.skip');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  var result = [-2, -1, 0, 1, 2][Skip](2);
  var array = result[ToArray]();

  assert(array.length == 3);
  assert(array[0] == 0);
  assert(array[1] == 1);
  assert(array[2] == 2);
}
readme();
```

## API
```ts
skip(count)
```

### Parameters
- `count`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.skip
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/reflect.implement-i-enumerable`](https://www.npmjs.com/package/@kingjs/reflect.implement-i-enumerable)|`latest`|
## Source
https://repository.kingjs.net/linq/skip
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/skip)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.skip
