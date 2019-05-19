# @[kingjs][@kingjs]/[path-buffer][ns0]
An working set efficient representation of paths.
## Usage
```js
var assert = require('assert')
var Path = require('path')
var PathBuffer = require('@kingjs/path-buffer')

var Sep = Path.sep

var parseAbsolute = Path.parse('/')
var parseRelative = Path.parse('.')

var root = PathBuffer.create()
var foo = root.joinWith('foo')
var bar = foo.joinWith('bar')
assert(bar.path == `foo${Sep}bar`)

var pathBuffer = PathBuffer.create(`.${Sep}foo${Sep}bar`)
assert(pathBuffer.path == `foo${Sep}bar`)

var pathBuffer = PathBuffer.create(`foo${Sep}bar`)
assert(pathBuffer.path == `foo${Sep}bar`)

var pathBuffer = PathBuffer.create(`${Sep}foo${Sep}bar`)
assert(pathBuffer.path == `${Sep}foo${Sep}bar`)

var pathBuffer = PathBuffer.create(`${Sep}foo${Sep}..`)
assert(pathBuffer.pathAsDir == `${Sep}`)

var pathBuffer = PathBuffer.create(`${Sep}`)
assert(pathBuffer.dir === undefined)
assert(pathBuffer.name == ``)
assert(pathBuffer.path == `${Sep}`)
assert(pathBuffer.pathAsDir == `${Sep}`)

var pathBuffer = PathBuffer.create(``)
assert(pathBuffer.dir == undefined)
assert(pathBuffer.name == `.`)
assert(pathBuffer.path == `.`)
assert(pathBuffer.pathAsDir == ``)

function test(pathBuffer, isRelative) {
  assert(pathBuffer.buffer.toString() == pathBuffer.toString())
  assert(pathBuffer.buffer.toString() == pathBuffer.path)
  assert(pathBuffer.isAbsolute != isRelative)
  assert(pathBuffer.bufferAsDir.toString() == pathBuffer.pathAsDir)
}

function testComposite(pathBuffer, root, name, isRelative) {
  assert(pathBuffer.name === name)
  assert(!pathBuffer.isRoot)
  var dir = isRelative ? '' : Sep
  assert(pathBuffer.dir == dir)
  assert(pathBuffer.path == `${dir}${name}`)
  assert(pathBuffer.parent)
  assert(pathBuffer.parent.pathAsDir == pathBuffer.dir)
  assert(!pathBuffer.isRoot)

  test(pathBuffer, isRelative)
}

test(PathBuffer.create('.'), true)
test(PathBuffer.create(''), true)
test(PathBuffer.create(Sep), false)

testComposite(PathBuffer.create('.' + Sep + 'foo'), '', 'foo', true)
testComposite(PathBuffer.create('foo'), '', 'foo', true)
testComposite(PathBuffer.create(Sep + 'foo'), Sep, 'foo', false)

```




### Remarks
 - `PathBuffer.create([path])`: Activate a new `PathBuffer`
   - Uses `path.normalize` to normalize the path
 - `PathBuffer` supports the following methods and properties
   - `joinWith(name)`: Takes a string and returns a `PathBuffer`
   - `buffer`: The path as a buffer
   - `bufferAsDir`: The path as a directory (with trailing sep) as a buffer
   - `name` : The name of the file or directory
   - `path` : The path as a string
   - `pathAsDir` : The path as a directory (with trailing sep) as a string
   - `dir` : The directory of the `PathBuffer` as a string
   - `parent` : The parent `PathBuffer`
   - `root` : The ultimate ancestor
   - `isRoot` : `true` if there is no `parent`
   - `isAbsolute` : `true` if the `root` `bufferAsDir` is a separator

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
