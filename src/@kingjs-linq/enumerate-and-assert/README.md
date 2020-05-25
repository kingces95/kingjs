# @[kingjs][@kingjs]/[linq][ns0].[append][ns1]
Generates an sequence identical to another  sequence but with a value added to the end.
## Usage
```js
require('kingjs')
var assert = require('assert');

var Append = require('@kingjs/linq.append');
var ToArray = require('@kingjs/linq.to-array');

var source = [ 0, 1, 2 ];
var enumerable = source[Append](3);
var result = enumerable[ToArray]();

assert.deepEqual([0, 1, 2, 3], result);
```

## API
```ts
append()
```




## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.append
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/linq.concat`](https://www.npmjs.com/package/@kingjs/linq.concat)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/append
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/append)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.append
