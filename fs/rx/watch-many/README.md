# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[watch-many][ns2]
Watch a for file and directory events in a directory and all its descendent directories.
## Usage
```js
require('@kingjs/shim')
var Path = require('path')
var watchMany = require('@kingjs/fs.rx.watch-many')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Log = require('@kingjs/rx.log')

var changeId = 0
var cwd = process.cwd()

watchMany('.')
  [Subscribe](
    iNode => {
      var path = iNode.path
      var name = path ? Path.relative(cwd, path) : '?'
      var id = iNode[Key]
      console.log('LINK', name, id)

      iNode[Subscribe](
        stats => console.log('CHANGE', changeId++, name, id, stats.ctimeMs),
        () => console.log('UNLINK', name, id)
      )
    }, 
    () => console.log('CLOSE')
  )

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
|[`@kingjs/rx.finalize`](https://www.npmjs.com/package/@kingjs/rx.finalize)|`latest`|
|[`@kingjs/rx.i-grouped-observable`](https://www.npmjs.com/package/@kingjs/rx.i-grouped-observable)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/rx.log`](https://www.npmjs.com/package/@kingjs/rx.log)|`latest`|
|[`@kingjs/rx.pipe`](https://www.npmjs.com/package/@kingjs/rx.pipe)|`latest`|
|[`@kingjs/rx.publish`](https://www.npmjs.com/package/@kingjs/rx.publish)|`latest`|
|[`@kingjs/rx.select-many`](https://www.npmjs.com/package/@kingjs/rx.select-many)|`latest`|
|[`@kingjs/rx.take`](https://www.npmjs.com/package/@kingjs/rx.take)|`latest`|
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
