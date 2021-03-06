# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[subject][ns2].[inode][ns3]
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
var DistinctStats = require('@kingjs/fs.rx.subject.inode')

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
$ npm install @kingjs/fs.rx.subject.inode
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/rx.proxy-subject`](https://www.npmjs.com/package/@kingjs/rx.proxy-subject)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/subject/inode
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/subject/inode)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.subject
[ns3]: https://www.npmjs.com/package/@kingjs/fs.rx.subject.inode
