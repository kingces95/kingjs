require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var Path = require('path')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Do = require('@kingjs/rx.do')
var InodeSubject = require('@kingjs/fs.rx.subject.inode')
var DirentSubject = require('@kingjs/fs.rx.subject.dirent')
var DirSubject = require('..')

var DirName = 'test'
var FileName = 'test.txt'
var FilePath = Path.join(DirName, FileName)

if (fs.existsSync(FilePath))
  fs.unlinkSync(FilePath)

if (fs.existsSync(DirName))
  fs.rmdirSync(DirName)

fs.mkdirSync(DirName)
var stats = fs.statSync(DirName)

var dir = InodeSubject.create(stats)
assert(dir instanceof DirSubject)
assert(dir.isDirectory)
assert(dir.ino = stats.ino)

var result = 0
dir
  [Do](o => assert(o instanceof DirentSubject))
  [Do](o => assert(o.dir == dir))
  [Do](o => assert(o.name == FileName))
  [Do](o => assert(o[Key] == FileName))
  [Subscribe](
    o => o[Subscribe](
      x => {
        assert(x === null)
        result++
      },
      () => result = -1
    ),
    () => result = -2
  )

var dirent = fs.readdirSync(DirName)
dir[Next](dirent)
assert(result == 0)

fs.writeFileSync(FilePath)
var dirent = fs.readdirSync(DirName)
dir[Next](dirent)
dir[Next](dirent)
assert(result == 2)

fs.unlinkSync(FilePath)
var dirent = fs.readdirSync(DirName)
dir[Next](dirent)
assert(result == -1)

fs.rmdirSync(DirName)
dir[Complete]()
assert(result == -2)