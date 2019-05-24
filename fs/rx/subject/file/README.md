# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[subject][ns2].[file][ns3]
Returns a `IGroupedObservable` with `path` for a `Key`  that emits `IGroupedObservable`s with `stats.ino` for `Key` that each emit `stats.ino` whenever the `ctime` changes.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var Do = require('@kingjs/rx.do')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var FileSubject = require('@kingjs/fs.rx.subject.file')

var FileName = 'test.txt'

// get stats
var stats = fs.statSync(FileName)
var { ino } = stats

// create subject
var file = new FileSubject(ino)
assert(file.isFile)
assert(file.ino == ino)

// wait for timestamp changes 
var result
file[Subscribe](
  o => result = o,
  () => result = undefined
)

// push first stat through
file[Next](stats)
assert(result == stats)

// no change so no event
result = null
file[Next](stats)
assert(result == null)

// ensure replay of last stat
var behavior
file
  [Do](o => behavior = o)
  [Subscribe]()
assert(behavior.ino == ino)

// update file
fs.writeFileSync(FileName)
var stats = fs.statSync(FileName)
file[Next](stats)
assert(result == stats)

file[Complete]()
assert(result === undefined)
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
|[`@kingjs/rx.publish`](https://www.npmjs.com/package/@kingjs/rx.publish)|`latest`|
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
