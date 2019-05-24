require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var fsp = require('fs').promises
var Path = require('path')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Do = require('@kingjs/rx.do')
var sleep = require('@kingjs/promise.sleep')
var DirSubject = require('..')

var DirName = 'test'
var FileName = 'test.txt'
var FilePath = Path.join(DirName, FileName)

// clean out test file and dir
if (fs.existsSync(FilePath))
  fs.unlinkSync(FilePath)
if (fs.existsSync(DirName))
  fs.rmdirSync(DirName)

  // create test dir
fs.mkdirSync(DirName)

// create DirSubject
var stats = fs.statSync(DirName)
var dir = new DirSubject(stats)
assert(dir instanceof DirSubject)
assert(dir.isDirectory)
assert(dir.ino = stats.ino)

// trap for various events
var result = 0
dir
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

// trigger events
var ms = 100
async function test() {

  // no file
  var dirent = fsp.readdir(DirName)
  dir[Next](dirent)
  assert(result == 0)
  await sleep(ms)

  // new file
  fs.writeFileSync(FilePath)
  var dirent = fsp.readdir(DirName)
  dir[Next](dirent)
  await sleep(ms)
  assert(result == 1)

  // same file
  var dirent = fsp.readdir(DirName)
  dir[Next](dirent)
  await sleep(ms)
  assert(result == 2)
  
  // ensure published; replay existing dirs
  var replay
  dir[Subscribe](o => replay = o)
  replay[Key] == DirName

  // remove file
  fs.unlinkSync(FilePath)
  var dirent = fsp.readdir(DirName)
  dir[Next](dirent)
  await sleep(ms)
  assert(result == -1)
  
  // remove dir + complete
  fs.rmdirSync(DirName)
  dir[Complete]()
  await sleep(ms)
  assert(result == -2)
}

test()