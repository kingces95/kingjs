# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[path-subject][ns2]
A `ProxySubject` which composes a `PathBuffer`.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var Path = require('path')
var Select = require('@kingjs/rx.select')
var SelectMany = require('@kingjs/rx.select-many')
var Log = require('@kingjs/rx.log')
var WatchSubject = require('@kingjs/fs.rx.watch-subject')

var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var PathSubject = require('@kingjs/fs.rx.path-subject')

// relative
var relative = PathSubject.create(null, null)
assert(!relative.isAbsolute)

// compose path foo/bar
var foo = relative.joinWith('foo')
var bar = foo.joinWith('bar')
assert(bar.path == 'foo/bar')
assert(bar.parent == foo)

// absolute
var absolute = PathSubject.createAbsolute(null, null)
assert(absolute.isAbsolute)

process.chdir('test')
var pwd = PathSubject.create(
  o => new WatchSubject(o.path)
)

var testFile = pwd.joinWith('foo.txt')

testFile
  [Log]('FOO')
  [SelectMany]()
  [Log]('STATS')
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
$ npm install @kingjs/fs.rx.path-subject
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/buffer.append`](https://www.npmjs.com/package/@kingjs/buffer.append)|`latest`|
|[`@kingjs/fs.rx.inode-subject`](https://www.npmjs.com/package/@kingjs/fs.rx.inode-subject)|`latest`|
|[`@kingjs/path-buffer`](https://www.npmjs.com/package/@kingjs/path-buffer)|`latest`|
|[`@kingjs/reflect.create-symbol`](https://www.npmjs.com/package/@kingjs/reflect.create-symbol)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
|[`@kingjs/rx.pool`](https://www.npmjs.com/package/@kingjs/rx.pool)|`latest`|
|[`@kingjs/rx.proxy-subject`](https://www.npmjs.com/package/@kingjs/rx.proxy-subject)|`latest`|
|[`@kingjs/rx.window-by`](https://www.npmjs.com/package/@kingjs/rx.window-by)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/path-subject
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/path-subject)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.path-subject
