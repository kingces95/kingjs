# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[subject][ns2].[file][ns3]
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
var Finalize = require('@Kingjs/rx.finalize')
var Select = require('@Kingjs/rx.select')
var Do = require('@Kingjs/rx.spy')
var FileSubject = require('@kingjs/fs.rx.subject.file')

var FileName = 'test.txt'

var result = []

var file = new FileSubject()

file
  [Do](
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

file
  [Do](
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
  var stats = fs.statSync('.')
  subject[Next](stats)
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
$ npm install @kingjs/fs.rx.subject.file
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/fs.rx.subject.inode`](https://www.npmjs.com/package/@kingjs/fs.rx.subject.inode)|`latest`|
|[`@kingjs/rx.distinct-until-changed`](https://www.npmjs.com/package/@kingjs/rx.distinct-until-changed)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/subject/file
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/subject/file)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.subject
[ns3]: https://www.npmjs.com/package/@kingjs/fs.rx.subject.file
