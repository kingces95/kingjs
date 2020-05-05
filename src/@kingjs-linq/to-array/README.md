# @[kingjs][@kingjs]/[linq][ns0].[to-array][ns1]
Creates an array from a `IEnumerable`.
## Usage
```js
require('kingjs');
var assert = require('assert');
var ToArray = require('@kingjs/linq.to-array');

var array = '123'[ToArray]();

assert(array.length = 3);
assert(array[0] === '1');
assert(array[1] === '2');
assert(array[2] === '3');
```

## API
```ts
toArray(this)
```

### Parameters
- `this`: An `IEnumerable` from which to create an array.



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.to-array
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/linq.aggregate`](https://www.npmjs.com/package/@kingjs/linq.aggregate)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/to-array
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/to-array)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.to-array
