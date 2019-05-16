require('@kingjs/shim')
var assert = require('assert')
var Path = require('path')
var Select = require('@kingjs/rx.select')
var SelectMany = require('@kingjs/rx.select-many')
var Log = require('@kingjs/rx.log')
var WatchSubject = require('@kingjs/fs.rx.watch-subject')

var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var PathSubject = require('..')

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
  o => new WatchSubject(o.buffer)
)
pwd
  [Log]('FOO')
  [SelectMany]()
  [Log]('STATS')
  [Subscribe]()