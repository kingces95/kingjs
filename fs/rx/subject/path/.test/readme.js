require('@kingjs/shim')
var assert = require('assert')
var PathBuffer = require('@kingjs/path-buffer')
var SelectMany = require('@kingjs/rx.select-many')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Do = require('@kingjs/rx.do')
var WatchSubject = require('@kingjs/fs.rx.subject.watch')
var DirLinkSubject = require('@kingjs/fs.rx.subject.dir-link')
var FileLinkSubject = require('@kingjs/fs.rx.subject.file-link')

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
  [Do](o => assert(o instanceof DirLinkSubject))
  [SelectMany](o => o) // DirLink -> DirEntry
  [Do](o => console.log(i++, '+', o.name))
  [Do](o => o[Subscribe](
    x => console.log(i++, '^', o.name),
    () => console.log(i++, '-', o.name)
  ))
  [Subscribe]()