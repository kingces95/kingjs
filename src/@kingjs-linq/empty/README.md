# @[kingjs][@kingjs]/[linq][ns0].[empty][ns1]
Returns an empty sequence.
## Usage
```js
var empty = require('@kingjs/linq.empty');

var assert = require('assert');
var ToArray = require('@kingjs/linq.to-array');

assert(empty() === empty());

var array = empty()[ToArray]();
assert(array.length == 0);
```

## API
```ts
empty()
```




## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.empty
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/empty
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/empty)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.empty
