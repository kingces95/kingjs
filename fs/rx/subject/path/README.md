# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[subject][ns2].[path][ns3]
A `ProxySubject` which composes a `PathBuffer`.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var PathBuffer = require('@kingjs/path-buffer')
var SelectMany = require('@kingjs/rx.select-many')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Do = require('@kingjs/rx.do')
var WatchSubject = require('@kingjs/fs.rx.subject.watch')
var LinkSubject = require('@kingjs/fs.rx.subject.link')

var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var PathSubject = require('@kingjs/fs.rx.subject.path')

process.chdir('test')
var pwdBuffer = PathBuffer.create()
var pwd = PathSubject.create(
  pwdBuffer,
  o => new WatchSubject(o.buffer)
)

var i = 0;

pwd
  [Do](o => console.log(i++, 'DIR', o.ino))
  [Do](o => assert(o instanceof LinkSubject))
  [Do](o => assert(o.isDirectory))
  [SelectMany](o => o) // Link (dir) -> DirEntry -> Path
  [Do](o => assert(o instanceof PathSubject))
  [Do](o => console.log(i++, '+', o.name))
  [Do](o => o[Subscribe](
    x => console.log(i++, '^', o.name),
    () => console.log(i++, '-', o.name)
  ))
  [Subscribe]()
```




### Remarks
For each observation, the path is checked and if its linked inode  has changed then a new derivation InodeSubject is emitted after closing the previously emitted InodeSubject, if any.
 - `PathSubject.create(createSubject, activate[, isAbsolute])` activates a new instance.
 - Same with `PathSubject.createAbsolute(createSubject, activate)`
 - `PathSubject` supports the same properties as a `PathBuffer` with the following exceptions
   - `parent`: Returns a parent `PathSubject`
   - `joinWith(name)`: Returns a `PathSubject` activated with using the parent's `createSubject` and `activate`
   - `root`: Returns a `PathSubject` ProxySubject implements ISubject InodeSubject(ino) extends ProxySubject DirSubject(ino) extends InodeSubject : PathSubject -> names -> PathSubjects if new paths FileSubject(ino) extends InodeSubject : PathSubject -> ctime -> null if newer PathSubject(name, parent) extends ProxySubject : null -> stats -> InodeSubject

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.subject.path
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/fs.rx.subject.dir`](https://www.npmjs.com/package/@kingjs/fs.rx.subject.dir)|`latest`|
|[`@kingjs/fs.rx.subject.file`](https://www.npmjs.com/package/@kingjs/fs.rx.subject.file)|`latest`|
|[`@kingjs/fs.rx.subject.link`](https://www.npmjs.com/package/@kingjs/fs.rx.subject.link)|`latest`|
|[`@kingjs/reflect.create-symbol`](https://www.npmjs.com/package/@kingjs/reflect.create-symbol)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
|[`@kingjs/rx.pipe`](https://www.npmjs.com/package/@kingjs/rx.pipe)|`latest`|
|[`@kingjs/rx.pool`](https://www.npmjs.com/package/@kingjs/rx.pool)|`latest`|
|[`@kingjs/rx.proxy-subject`](https://www.npmjs.com/package/@kingjs/rx.proxy-subject)|`latest`|
|[`@kingjs/rx.select`](https://www.npmjs.com/package/@kingjs/rx.select)|`latest`|
|[`@kingjs/rx.singletons`](https://www.npmjs.com/package/@kingjs/rx.singletons)|`latest`|
|[`@kingjs/rx.where`](https://www.npmjs.com/package/@kingjs/rx.where)|`latest`|
|[`@kingjs/rx.window-by`](https://www.npmjs.com/package/@kingjs/rx.window-by)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/subject/path
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/subject/path)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.subject
[ns3]: https://www.npmjs.com/package/@kingjs/fs.rx.subject.path
