# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[watch][ns2]
Watches a path until cancelled.
## Usage
```js
var assert = require('assert');
var fs = require('fs');
var ToPromise = require('@kingjs/rx.to-promise');
var watch = require('@kingjs/fs.rx.watch');

var fileName = 'temp';

async function run() {
  var observable = watch();
  var promise = observable[ToPromise]();
  fs.writeFileSync(fileName);
  var result = await promise;
  assert(result);
  fs.unlinkSync(fileName);
}
run()

```

## API
```ts
watch([path])
```

### Parameters
- `path`: The path to watch.
### Returns
Returns an `IObservable` which emits `next` when a change to the path is observed and `error` with if the watcher reports an error.
### Remarks
 - No provision is made for typing the change that happened.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.watch
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/path.make-absolute`](https://www.npmjs.com/package/@kingjs/path.make-absolute)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/watch
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/watch)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.watch