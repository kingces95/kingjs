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
var PathSubject = require('..')

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
    null,
    () => console.log(i++, '-', o.name)
  ))
  [SelectMany](o => o) // Path -> Link (file)
  [Do](o => assert(o instanceof LinkSubject))
  [SelectMany](
    o => o[Do](
      x => console.log(i++, '.', o.name)
    )
  )
  [Do](o => assert(o.constructor.name == 'Stats'))
  [Subscribe]()
  