# @[kingjs][@kingjs]/[fs][ns0].[watch][ns1]
Watches a path until cancelled.
## Usage
```js
var assert = require('assert');
var fs = require('fs');
var sleep = require('@kingjs/promise.sleep');
var { Subscribe } = require('@kingjs/i-observable');
var ToPromise = require('@kingjs/rx.to-promise');
var watch = require('@kingjs/fs.watch');

var name = 'readme.js';
//var name = process.cwd();

var observable = watch(name);
var dispose = observable[Subscribe](
  o => console.log('> next'),
  () => console.log('> complete'),
  e => console.log('> error'),
);

setTimeout(() => {
  console.log('unwatch', name)
  dispose();
}, 5000)

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
$ npm install @kingjs/fs.watch
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/fs/watch
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/watch)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.watch
