# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[distinct-stats][ns2]
Returns a `IGroupedObservable` with `path` for a `Key`  that emits `IGroupedObservable`s with `stats.ino` for `Key` that each emit `stats.ino` whenever the `ctime` changes.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var is = require('@kingjs/reflect.is')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Finalize = require('@kingjs/rx.finalize')
var SelectMany = require('@kingjs/rx.select-many')
var Do = require('@kingjs/rx.do')
var Log = require('@kingjs/rx.log')
var PathSubject = require('@kingjs/fs.rx.path-subject')
var DistinctStats = require('@kingjs/fs.rx.distinct-stats')

var TempFileName = 'file.txt'

var result = []

var subject = new PathSubject(TempFileName)
var stats = subject
  [DistinctStats]()

stats
  [Do](o => assert(is.number(o[Key])))
  [Do](o => assert(path.basename(o.path) == TempFileName))
  [SelectMany](o => o
    [Do](
      () => result.push('CHANGE'),
      () => result.push('UNLINK PATH')
    )
  )
  [Subscribe]()

stats
  [Do](
    () => result.push('LINK PATH'),
    () => result.push('COMPLETE')
  )
  [Finalize](o => {
    fs.unlinkSync(TempFileName)
    assert.deepEqual(result, [ 
      'LINK PATH',
      'CHANGE',
      'CHANGE',
      'UNLINK PATH',
      'LINK PATH',
      'CHANGE',
      'UNLINK PATH',
      'COMPLETE' 
    ])
  })
  [Subscribe]()

var t = 0
var dt = 100

setTimeout(() => {
  fs.writeFileSync(TempFileName)
  subject[Next]()
}, t += dt)

setTimeout(() => {
  fs.writeFileSync(TempFileName)
  subject[Next]()
  subject[Next]()
}, t += dt)

setTimeout(() => {
  fs.unlinkSync(TempFileName)
  fs.writeFileSync(TempFileName)
  subject[Next]()
}, t += dt)

setTimeout(() => {
  subject[Complete]()
}, t += dt)
```

## API
```ts
distinctStats([path])
```

### Parameters
- `path`: The path whose stat `ctime` changes are to be  partitioned by `ino`.
### Returns
Returns a `IObservable` which emits `IGroupedObservable`s where each completes before the next is emitted and emits whenever the ctime changes between source `IObservable` emissions.
### Remarks
 - If a source emission is observed before the stat for the previous emission has been read and reported, then the emission is queued. Source emissions beyond that are dropped.
 - The emitted `IGroupedObservable`s have properties
   - `path` - the path.
   - `ino` - the file system node id.
   - `isBlockDevice`, `isCharacterDevice`, `isDirectory`,  `isFIFO`, `isFile`, `isSocket`, `isSymbolicLink` - type

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.distinct-stats
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/fs.rx.path-subject`](https://www.npmjs.com/package/@kingjs/fs.rx.path-subject)|`latest`|
|[`@kingjs/fs.rx.stats-subject`](https://www.npmjs.com/package/@kingjs/fs.rx.stats-subject)|`latest`|
|[`@kingjs/path.make-absolute`](https://www.npmjs.com/package/@kingjs/path.make-absolute)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.distinct-until-changed`](https://www.npmjs.com/package/@kingjs/rx.distinct-until-changed)|`latest`|
|[`@kingjs/rx.i-grouped-observable`](https://www.npmjs.com/package/@kingjs/rx.i-grouped-observable)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.pool`](https://www.npmjs.com/package/@kingjs/rx.pool)|`latest`|
|[`@kingjs/rx.window-by`](https://www.npmjs.com/package/@kingjs/rx.window-by)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/distinct-stats
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/distinct-stats)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.distinct-stats
