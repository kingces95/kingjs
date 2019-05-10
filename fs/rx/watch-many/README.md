# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[watch-many][ns2]
Watches for changes is a directory and its subdirectory.
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

watchMany()
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
watchMany([dir[, observer[, watcher[, options]]]])
```

### Parameters
- `dir`: The directory to watch. Defaults to current directory.
- `observer`: An `IObservable` whose completion signals the directory should no longer be observed.
- `watcher`: Returns an `IObservable` whose emissions trigger the reporting changes to the content of `dir`.
- `options`: Options for filtering which directories .



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
|[`@kingjs/path.test`](https://www.npmjs.com/package/@kingjs/path.test)|`latest`|
|[`@kingjs/reflect.create-symbol`](https://www.npmjs.com/package/@kingjs/reflect.create-symbol)|`latest`|
|[`@kingjs/rx.do`](https://www.npmjs.com/package/@kingjs/rx.do)|`latest`|
|[`@kingjs/rx.i-grouped-observable`](https://www.npmjs.com/package/@kingjs/rx.i-grouped-observable)|`latest`|
|[`@kingjs/rx.publish`](https://www.npmjs.com/package/@kingjs/rx.publish)|`latest`|
|[`@kingjs/rx.select-many`](https://www.npmjs.com/package/@kingjs/rx.select-many)|`latest`|
|[`@kingjs/rx.where`](https://www.npmjs.com/package/@kingjs/rx.where)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/watch-many
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/watch-many)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.watch-many
