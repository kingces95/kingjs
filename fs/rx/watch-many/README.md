# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[watch-many][ns2]
Watch a for file and directory events in a directory and all its descendent directories.
## Usage
```js
require('@kingjs/shim')
var watchMany = require('@kingjs/fs.rx.watch-many');
var { Subscribe } = require('@kingjs/rx.i-observable')
var Log = require('@kingjs/rx.log')
var Where = require('@kingjs/rx.where')

var watch = watchMany('.');
//var watch = watchMany('../../../..');
// watch[Subscribe](
//   o => console.log('FILE', o)
// );

watch
  [Log]('MOTION', '${name} ${current} -> ${previous}')
  [Subscribe]();

    
```

## API
```ts
watchMany(root, dirFilter(name, dir))
```

### Parameters
- `root`: The root directory to start watching
- `dirFilter`: A callback to filter whether a subdirectory should be watched.
  - `name`: The name of the sub-directory.
  - `dir`: The directory containing the sub-directory.
  - Returns an `IObservable` that emits events for various
file and directory events.



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.watch-many
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/fs.rx.dir-entries`](https://www.npmjs.com/package/@kingjs/fs.rx.dir-entries)|`latest`|
|[`@kingjs/fs.rx.distinct-stats`](https://www.npmjs.com/package/@kingjs/fs.rx.distinct-stats)|`latest`|
|[`@kingjs/fs.rx.watch`](https://www.npmjs.com/package/@kingjs/fs.rx.watch)|`latest`|
|[`@kingjs/linq.order-by`](https://www.npmjs.com/package/@kingjs/linq.order-by)|`latest`|
|[`@kingjs/linq.zip-join`](https://www.npmjs.com/package/@kingjs/linq.zip-join)|`latest`|
|[`@kingjs/path.make-absolute`](https://www.npmjs.com/package/@kingjs/path.make-absolute)|`latest`|
|[`@kingjs/rx.debounce`](https://www.npmjs.com/package/@kingjs/rx.debounce)|`latest`|
|[`@kingjs/rx.distinct`](https://www.npmjs.com/package/@kingjs/rx.distinct)|`latest`|
|[`@kingjs/rx.group-by`](https://www.npmjs.com/package/@kingjs/rx.group-by)|`latest`|
|[`@kingjs/rx.i-grouped-observable`](https://www.npmjs.com/package/@kingjs/rx.i-grouped-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/rx.log`](https://www.npmjs.com/package/@kingjs/rx.log)|`latest`|
|[`@kingjs/rx.pipe`](https://www.npmjs.com/package/@kingjs/rx.pipe)|`latest`|
|[`@kingjs/rx.pool`](https://www.npmjs.com/package/@kingjs/rx.pool)|`latest`|
|[`@kingjs/rx.rolling-select`](https://www.npmjs.com/package/@kingjs/rx.rolling-select)|`latest`|
|[`@kingjs/rx.select`](https://www.npmjs.com/package/@kingjs/rx.select)|`latest`|
|[`@kingjs/rx.select-many`](https://www.npmjs.com/package/@kingjs/rx.select-many)|`latest`|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
|[`@kingjs/rx.to-array`](https://www.npmjs.com/package/@kingjs/rx.to-array)|`latest`|
|[`@kingjs/rx.where`](https://www.npmjs.com/package/@kingjs/rx.where)|`latest`|
|[`@kingjs/task-pool`](https://www.npmjs.com/package/@kingjs/task-pool)|`latest`|
|[`deep-equal`](https://www.npmjs.com/package/deep-equal)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/watch-many
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/watch-many)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.watch-many
