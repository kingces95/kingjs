require('@kingjs/shim')
var assert = require('assert')
var Path = require('path')
var { Subscribe } = require('@kingjs/rx.i-observable')
var SelectMany = require('@kingjs/rx.select-many')
var Do = require('@kingjs/rx.do')
var Log = require('@kingjs/rx.log')
var WatchSubject = require('@kingjs/fs.rx.watch-subject')
var LinkSubject = require('..')

var parse = Path.parse('/foo/bar')

process.chdir('test')

var pwd = LinkSubject.create(
  o => new WatchSubject(o.path)
)

var testFile = pwd.create('foo.txt')

testFile
  [Log]('FOO')
  [SelectMany]()
  [Log]('STATS')
  [Subscribe]()