# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[path-subject][ns2]
Returns a `IGroupedObservable` with `path` for a `Key`  that emits `IGroupedObservable`s with `stats.ino` for `Key` that each emit `stats.ino` whenever the `ctime` changes.
## Usage
```js
var assert = require('assert')
var Path = require('path')
var Select = require('@kingjs/rx.select')
var Subject = require('@kingjs/rx.subject')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var PathSubject = require('@kingjs/fs.rx.path-subject')

var Dot = '.'
var root = PathSubject.Root
assert(root.isRoot)
assert(root.parent === null)
assert(root.basename === Dot)
assert(root.toString() == root.path)
assert(root.buffer.toString() === root.path)
assert(root.buffer.toString() === Dot)

assert(new PathSubject('foo').root = root)

var root = new PathSubject()
assert(root.isRoot)
assert(root.parent === null)
assert(root.basename === Dot)
assert(root.toString() == root.path)
assert(root.buffer.toString() === root.path)
assert(root.buffer.toString() === Dot)

var Foo = 'foo'
var foo = new PathSubject(Foo, root)
assert(!foo.isRoot)
assert(foo.parent == root)
assert(foo.dir === Dot)
assert(foo.basename === Foo)
assert(foo.toString() == foo.path)
assert(foo.buffer.toString() === foo.path)
assert(foo.buffer.toString() === Foo)

var keys = []
for (var o in foo)
  keys.push(o)

var Bar = 'bar'
var bar = new PathSubject(Bar, foo)
assert(!bar.isRoot)
assert(bar.parent == foo)
assert(bar.dir === foo.path)
assert(bar.basename === Bar)
assert(bar.buffer.toString() === bar.path)
assert(bar.buffer.toString() === Path.join(foo.path, bar.basename))

var Baz = 'baz'
var baz = new PathSubject(Baz, bar)
assert(!baz.isRoot)
assert(baz.parent == bar)
assert(baz.dir === bar.path)
assert(baz.basename === Baz)
assert(baz.buffer.toString() === baz.path)
assert(baz.buffer.toString() === Path.join(bar.path, baz.basename))

var result = []
root[Subscribe](o => result.push(o))
root[Complete]()
assert.deepEqual(result, [ ])

var result = []
var zero = new PathSubject(
  '.', 
  null, 
  () => new Subject(),
  o => o[Select](x => x + 1)
)

zero[Subscribe](o => result.push(o))
zero[Next](0)
zero[Complete]()
assert.deepEqual(result, [ 1 ])

```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.path-subject
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/buffer.append`](https://www.npmjs.com/package/@kingjs/buffer.append)|`latest`|
|[`@kingjs/reflect.create-symbol`](https://www.npmjs.com/package/@kingjs/reflect.create-symbol)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
|[`@kingjs/rx.proxy-subject`](https://www.npmjs.com/package/@kingjs/rx.proxy-subject)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/path-subject
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/path-subject)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.path-subject
