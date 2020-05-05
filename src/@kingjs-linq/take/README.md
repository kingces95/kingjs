# @[kingjs][@kingjs]/[linq][ns0].[take][ns1]
Generates a sequence identical to  another sequence up to a specified index.
## Usage
```js
require('kingjs');
var Take = require('@kingjs/linq.take');
var assert = require('assert');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  var result = [-2, -1, 0, 1, 2][Take](2);
  var array = result[ToArray]();

  assert(array.length == 2);
  assert(array[0] == -2);
  assert(array[1] == -1);
}
readme();
```

## API
```ts
take(count)
```

### Parameters
- `count`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.take
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/reflect.implement-i-enumerable`](https://www.npmjs.com/package/@kingjs/reflect.implement-i-enumerable)|`latest`|
## Source
https://repository.kingjs.net/linq/take
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/take)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.take
