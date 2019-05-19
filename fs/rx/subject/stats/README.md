# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[subject][ns2].[path][ns3]
A `ProxySubject` which composes a `PathBuffer`.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var Path = require('path')
var PathBuffer = require('@kingjs/path-buffer')
var Select = require('@kingjs/rx.select')
var SelectMany = require('@kingjs/rx.select-many')
var Log = require('@kingjs/rx.log')
var Do = require('@kingjs/rx.do')
var WatchSubject = require('@kingjs/fs.rx.watch-subject')

var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var PathSubject = require('@kingjs/fs.rx.subject.path')

var Sep = Path.sep
var Dot = '.'

// relative
var relativePath = PathBuffer.create(Dot)
var relative = PathSubject.create(relativePath)
assert(!relative.isAbsolute)

// compose path foo/bar
var foo = relative.joinWith('foo')
var bar = foo.joinWith('bar')
assert(bar.path == `foo${Sep}bar`)
assert(bar.parent == foo)

// absolute
var absolutePath = PathBuffer.create(Sep)
var absolute = PathSubject.create(absolutePath)
assert(absolute.isAbsolute)

process.chdir('test')
var pwdBuffer = PathBuffer.create()
var pwd = PathSubject.create(
  pwdBuffer,
  o => new WatchSubject(o.buffer)
)

pwd
  [Log]('DIR', 'isDir: ${isDirectory}, ino: ${ino}')
  [SelectMany](
    o => o
  )
  [Do](
    o => o.constructor.name
  )
  [Log]('PATHS')
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
|[`@kingjs/buffer.append`](https://www.npmjs.com/package/@kingjs/buffer.append)|`latest`|
|[`@kingjs/fs.rx.inode-heap`](https://www.npmjs.com/package/@kingjs/fs.rx.inode-heap)|`latest`|
|[`@kingjs/fs.rx.subject.link`](https://www.npmjs.com/package/@kingjs/fs.rx.subject.link)|`latest`|
|[`@kingjs/path-buffer`](https://www.npmjs.com/package/@kingjs/path-buffer)|`latest`|
|[`@kingjs/reflect.create-symbol`](https://www.npmjs.com/package/@kingjs/reflect.create-symbol)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
|[`@kingjs/rx.pool`](https://www.npmjs.com/package/@kingjs/rx.pool)|`latest`|
|[`@kingjs/rx.proxy-subject`](https://www.npmjs.com/package/@kingjs/rx.proxy-subject)|`latest`|
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
