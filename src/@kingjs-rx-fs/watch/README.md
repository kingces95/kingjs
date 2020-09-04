# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[distinct-stats][ns2]
Returns the stats for a path that have a different  `ctime` than the last observed stats for the path.
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
var StatsSubject = require('@kingjs/fs.rx.stats-subject')
var DistinctStats = require('@kingjs/fs.rx.distinct-stats')

var TempFileName = 'file.txt'

var result = []

var subject = new PathSubject(TempFileName)
var stats = subject
  [DistinctStats]()
  [Do](o => assert(o instanceof StatsSubject))
  [Do](o => assert(is.number(o[Key])))
  [Do](
    () => result.push('LINK PATH'),
    () => result.push('COMPLETE')
  )
  [SelectMany](o => o
    [Do](o => assert(o.constructor.name == 'Stats'))
    [Do](
      () => result.push('CHANGE'),
      () => result.push('UNLINK PATH')
    )
  )
  [Subscribe](
    null,
    o => {
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
    }
  )

var t = 0
var dt = 100

setTimeout(() => {
  fs.writeFileSync(TempFileName)
  subject[Next]()                 // LINK PATH + CHANGE
}, t += dt)

setTimeout(() => {
  fs.writeFileSync(TempFileName)
  subject[Next]()                 // CHANGE
  subject[Next]()                 // nop
}, t += dt)

setTimeout(() => {
  fs.unlinkSync(TempFileName)
  fs.writeFileSync(TempFileName)
  subject[Next]()                 // UNLINK PATH + LINK PATH + CHANGE
}, t += dt)

setTimeout(() => {
  subject[Complete]()             // UNLINK PATH + COMPLETE
}, t += dt)
```

## API
```ts
distinctStats(this)
```

### Parameters
- `this`: The `PathSubject` whose stats will be observed.
### Returns
Returns a `PathSubject` which emits `StatsSubjects` which in turn emits `Stats` of the path.
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
