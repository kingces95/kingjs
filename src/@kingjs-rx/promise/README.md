# @[kingjs][@kingjs]/[rx][ns0].[promise][ns1]
Returns an `IObservable` emits values resolved via a callback like a promise that returns many values.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var fs = require('fs');
var SelectDirEntries = require('@kingjs/rx.promise');
var watch = require('@kingjs/fs.watch');
var First = require('@kingjs/rx.first');
var Select = require('@kingjs/rx.select');

var fileName = 'temp';

async function run() {

  var promise = watch()
    [SelectDirEntries]()
    [Select](o => o.name)
    [First](o => o == fileName);

  fs.writeFileSync(fileName);
  var result = await promise;
  assert(fileName == result);
  fs.unlinkSync(fileName);
}
run();
```

## API
```ts
promise()
```




## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.promise
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/rx.select-many`](https://www.npmjs.com/package/@kingjs/rx.select-many)|`latest`|
## Source
https://repository.kingjs.net/rx/promise
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/promise)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.promise
