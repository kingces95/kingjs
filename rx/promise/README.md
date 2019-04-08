# @[kingjs][@kingjs]/[fs][ns0].[select-dir-entries][ns1]
Returns an `IObservable` that blends this `IObservable` with those passed as arguments.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var fs = require('fs');
var SelectDirEntries = require('@kingjs/fs.select-dir-entries');
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
selectDirEntries()
```




## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.select-dir-entries
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.select-many`](https://www.npmjs.com/package/@kingjs/rx.select-many)|`latest`|
## Source
https://repository.kingjs.net/fs/select-dir-entries
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/select-dir-entries)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.select-dir-entries
