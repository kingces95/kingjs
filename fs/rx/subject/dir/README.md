# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[subject][ns2].[dir][ns3]
Returns a `IGroupedObservable` with `path` for a `Key`  that emits `IGroupedObservable`s with `stats.ino` for `Key` that each emit `stats.ino` whenever the `ctime` changes.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var Path = require('path')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Do = require('@kingjs/rx.do')
var SelectMany = require('@kingjs/rx.select-many')
var InodeSubject = require('@kingjs/fs.rx.subject.inode')
var DirentSubject = require('@kingjs/fs.rx.subject.dirent')
var DirSubject = require('@kingjs/fs.rx.subject.dir')

var DirName = 'test'
var FileName = 'test.txt'
var FilePath = Path.join(DirName, FileName)

if (fs.existsSync(FilePath))
  fs.unlinkSync(FilePath)

if (fs.existsSync(DirName))
  fs.rmdirSync(DirName)

fs.mkdirSync(DirName)
var stats = fs.statSync(DirName)

var dir = InodeSubject.create(stats)
assert(dir instanceof DirSubject)
assert(dir.isDirectory)
assert(dir.ino = stats.ino)

var result = 0
dir
  [Do](o => assert(o instanceof DirentSubject))
  [Do](o => assert(o.dir == dir))
  [Do](
    o => assert(o.name == o[Key] == FileName)
  )
  [SelectMany]()
  [Subscribe](
    o => result++,
    () => result = -1
  )

var dirent = fs.readdirSync(DirName)
dir[Next](dirent)
assert(result == 0)

fs.writeFileSync(FilePath)
var dirent = fs.readdirSync(DirName)
dir[Next](dirent)
dir[Next](dirent)
assert(result == 1)

fs.writeFileSync(FileName)
var dirent = fs.readdirSync(DirName)
dir[Next](dirent)
dir[Next](dirent)
assert(result == 1)

dir[Complete]()
assert(result == -1)
```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.subject.dir
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/fs.rx.subject.dirent`](https://www.npmjs.com/package/@kingjs/fs.rx.subject.dirent)|`latest`|
|[`@kingjs/fs.rx.subject.inode`](https://www.npmjs.com/package/@kingjs/fs.rx.subject.inode)|`latest`|
|[`@kingjs/linq.zip-join`](https://www.npmjs.com/package/@kingjs/linq.zip-join)|`latest`|
|[`@kingjs/rx.group-by`](https://www.npmjs.com/package/@kingjs/rx.group-by)|`latest`|
|[`@kingjs/rx.rolling-select`](https://www.npmjs.com/package/@kingjs/rx.rolling-select)|`latest`|
|[`@kingjs/rx.select-many`](https://www.npmjs.com/package/@kingjs/rx.select-many)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/subject/dir
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/subject/dir)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.subject
[ns3]: https://www.npmjs.com/package/@kingjs/fs.rx.subject.dir
