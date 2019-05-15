# @[kingjs][@kingjs]/[path-buffer][ns0]
Returns a `IGroupedObservable` with `path` for a `Key`  that emits `IGroupedObservable`s with `stats.ino` for `Key` that each emit `stats.ino` whenever the `ctime` changes.
## Usage
```js
var assert = require('assert')
var Path = require('path')
var Select = require('@kingjs/rx.select')
var Subject = require('@kingjs/rx.subject')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var PathBuffer = require('@kingjs/path-buffer')

var Sep = Path.sep

function test(pathBuffer, isRelative) {
  assert(pathBuffer.isRelative == isRelative)
  assert(pathBuffer.isAbsolute != pathBuffer.isRelative)
  assert(!pathBuffer.parent || pathBuffer.parent.path == pathBuffer.dir)
  assert(!pathBuffer.parent == pathBuffer.isRoot)
  assert(pathBuffer.buffer.toString() == pathBuffer.toString())
  assert(pathBuffer.buffer.toString() == pathBuffer.path)
}

function testRoot(pathBuffer, name, isRelative) {
  assert(pathBuffer.isRoot)
  assert(pathBuffer.name === isRelative ? '' : Sep)
  assert(pathBuffer.dir == undefined)

  test(pathBuffer, isRelative)
}

function testComposite(pathBuffer, root, name, isRelative) {
  assert(pathBuffer.name === name)
  assert(!pathBuffer.isRoot)
  assert(pathBuffer.dir == isRelative ? '' : Sep)

  testRoot(pathBuffer.parent, root, isRelative)
  test(pathBuffer, isRelative)
}

testRoot(PathBuffer.create('.'), '', true)
testRoot(PathBuffer.create(''), '', true)
testRoot(PathBuffer.create(Sep), Sep, false)

testComposite(PathBuffer.create('.' + Sep + 'foo'), '', 'foo', true)
testComposite(PathBuffer.create('foo'), '', 'foo', true)
testComposite(PathBuffer.create(Sep + 'foo'), Sep, 'foo', false)

var root = PathBuffer.create()
var foo = root.create('foo')
var bar = foo.create('bar')
assert(bar.path == `foo${sep}bar`)
```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/path-buffer
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/buffer.append`](https://www.npmjs.com/package/@kingjs/buffer.append)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
## Source
https://repository.kingjs.net/path-buffer
## License
MIT

![Analytics](https://analytics.kingjs.net/path-buffer)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/path-buffer
