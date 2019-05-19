# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[inode-heap][ns2]
Given a directory returns the directories entries.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var PathBuffer = require('@kingjs/path-buffer')
var InodeHeap = require('@kingjs/fs.rx.inode-heap')

var TempDirName = 'testDir'
var TempFileName = 'file.txt'

var inodes = new InodeHeap()

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
$ npm install @kingjs/fs.rx.inode-heap
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/fs.rx.inode-subject`](https://www.npmjs.com/package/@kingjs/fs.rx.inode-subject)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/inode-heap
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/inode-heap)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.inode-heap
