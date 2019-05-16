# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[dir-subject][ns2]
Returns a `IGroupedObservable` with `path` for a `Key`  that emits `IGroupedObservable`s with `stats.ino` for `Key` that each emit `stats.ino` whenever the `ctime` changes.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var is = require('@kingjs/reflect.is')
var of = require('@kingjs/rx.of')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Finalize = require('@Kingjs/rx.finalize')
var Select = require('@Kingjs/rx.select')
var Spy = require('@Kingjs/rx.spy')
var Log = require('@Kingjs/rx.log')
var Subject = require('@Kingjs/rx.subject')
var DistinctStats = require('@kingjs/fs.rx.dir-subject')

var TempFileName = 'file.txt'

var result = []

var subject = new Subject()
var stats = subject
  [DistinctStats](TempFileName)

stats
  [Spy](
    // assert Key looks like a stats.ino
    o => {
      assert(is.number(o[Key]))
      assert(path.basename(o.path) == TempFileName)
    }
  )
  [Select](o => o
    [Subscribe](
      x => result.push('CHANGE'),
      () => result.push(
        `UNLINK PATH`
      )
    )
  )
  [Subscribe]()

stats
  [Spy](
    o => result.push(
      `LINK PATH`
    ),
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
var dt = 10

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






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.dir-subject
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/fs.rx.inode-subject`](https://www.npmjs.com/package/@kingjs/fs.rx.inode-subject)|`latest`|
|[`@kingjs/fs.rx.path-subject`](https://www.npmjs.com/package/@kingjs/fs.rx.path-subject)|`latest`|
|[`@kingjs/linq.zip-join`](https://www.npmjs.com/package/@kingjs/linq.zip-join)|`latest`|
|[`@kingjs/rx.group-by`](https://www.npmjs.com/package/@kingjs/rx.group-by)|`latest`|
|[`@kingjs/rx.log`](https://www.npmjs.com/package/@kingjs/rx.log)|`latest`|
|[`@kingjs/rx.pool`](https://www.npmjs.com/package/@kingjs/rx.pool)|`latest`|
|[`@kingjs/rx.rolling-select`](https://www.npmjs.com/package/@kingjs/rx.rolling-select)|`latest`|
|[`@kingjs/rx.select-many`](https://www.npmjs.com/package/@kingjs/rx.select-many)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/dir-subject
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/dir-subject)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.dir-subject
