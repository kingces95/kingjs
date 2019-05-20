# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[watcher][ns2]
Given a directory returns the directories entries.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var Path = require('path')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var SelectMany = require('@kingjs/rx.select-many')
var Do = require('@kingjs/rx.do')
var Log = require('@kingjs/rx.log')
var PathSubject = require('@kingjs/fs.rx.path-subject')
var PathBuffer = require('@kingjs/path-buffer')
var Watcher = require('@kingjs/fs.rx.watcher')

var TempDirName = 'testDir'
var TempFileName = 'file.txt'

var result = []
var watcher = new Watcher()
var pwd = watcher.pwd

var dirBuffer = PathBuffer.create(TempDirName)
var dirStats = fs.statSync(dirBuffer.buffer)
var dir = inodes.allocate(dirStats)
assert(dir.isDirectory)
assert(dirStats.ino in inodes.heap)

var fileBuffer = dirBuffer.joinWith(TempFileName)
var fileStats = fs.statSync(fileBuffer.buffer)
var file = inodes.allocate(fileStats)
assert(file.isFile)
assert(fileStats.ino in inodes.heap)

```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.watcher
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/fs.rx.inode-heap`](https://www.npmjs.com/package/@kingjs/fs.rx.inode-heap)|`latest`|
|[`@kingjs/fs.rx.path-subject`](https://www.npmjs.com/package/@kingjs/fs.rx.path-subject)|`latest`|
|[`@kingjs/path-buffer`](https://www.npmjs.com/package/@kingjs/path-buffer)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/watcher
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/watcher)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.watcher
