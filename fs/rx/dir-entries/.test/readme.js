require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Finalize = require('@kingjs/rx.finalize')
var Select = require('@kingjs/rx.select')
var Do = require('@kingjs/rx.do')
var Log = require('@kingjs/rx.log')
var PathSubject = require('@kingjs/fs.rx.path-subject')
var DirEntry = require('..')

// create testDir/file.txt
var TempDirName = 'testDir';
var TempFileName = 'file.txt';
var TempFilePath = path.join(TempDirName, TempFileName);
fs.mkdirSync(TempDirName)
fs.writeFileSync(TempFilePath)

var result = [];

var subject = new PathSubject(TempDirName)
var dirEntries = subject
  [DirEntry](TempDirName)

dirEntries
  [Select](o => 
    o[Log]('DIR_ENTRY')
    [Subscribe](
      x => result.push(x),
      () => result.push(o[Key])
    )
  )
  [Subscribe]()

dirEntries
  [Log]('DIR')
  [Do](
    o => result.push(o),
    o => result.push('.')
  )
  [Finalize](o => {
    fs.unlinkSync(TempFilePath)
    fs.rmdirSync(TempDirName)
    assert(result[0][Key] == 'file.txt') // IGroupedObservable Observed
    assert(result[1] === null) // IGroupedObservable.Next: DirEntry
    assert(result[2] === null) // IGroupedObservable.Next: DirEntry
    assert(result[3] == 'file.txt') // IGroupedObservable.Complete
    assert(result[4] == '.') // Complete
  })
  [Subscribe]()

subject[Next](null)
subject[Next](null)
subject[Complete]()