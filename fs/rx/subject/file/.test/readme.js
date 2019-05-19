require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var InodeSubject = require('@kingjs/fs.rx.subject.inode')
var FileSubject = require('..')

var FileName = 'test.txt'
var stats = fs.statSync(FileName)

var file = InodeSubject.create(stats)
assert(file instanceof FileSubject)
assert(file.isFile)
assert(file.ino = stats.ino)

var result
file[Subscribe](
  o => result = o,
  () => result = undefined
)

file[Next](stats)
assert(result == stats)

result = null
file[Next](stats)
assert(result == null)

fs.writeFileSync(FileName)
var stats = fs.statSync(FileName)
file[Next](stats)
assert(result == stats)

file[Complete]()
assert(result === undefined)