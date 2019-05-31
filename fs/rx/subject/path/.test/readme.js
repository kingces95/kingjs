require('@kingjs/shim')
var assert = require('assert')
var Path = require('path')
var PathBuffer = require('@kingjs/path-buffer')
var Select = require('@kingjs/rx.select')
var SelectMany = require('@kingjs/rx.select-many')
var Log = require('@kingjs/rx.log')
var Do = require('@kingjs/rx.do')
var WatchSubject = require('@kingjs/fs.rx.subject.watch')

var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var PathSubject = require('..')

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