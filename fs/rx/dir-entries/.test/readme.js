require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var of = require('@kingjs/rx.of')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Finalize = require('@Kingjs/rx.finalize')
var Select = require('@Kingjs/rx.select')
var Spy = require('@Kingjs/rx.spy')
var Log = require('@Kingjs/rx.log')
var DirEntry = require('..')

// create testDir/file.txt
var TempDirName = 'testDir';
var TempFileName = 'file.txt';
var TempFilePath = path.join(TempDirName, TempFileName);
fs.mkdirSync(TempDirName)
fs.writeFileSync(TempFilePath)

var result = [];

var dirEntries = of(null, null)
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
  [Spy](
    o => result.push(o),
    o => result.push('.')
  )
  [Finalize](o => {
    fs.unlinkSync(TempFilePath)
    fs.rmdirSync(TempDirName)
    assert(result[0][Key] == 'file.txt') // IGroupedObservable Observed
    assert(result[1].name == 'file.txt') // IGroupedObservable.Next: DirEntry
    assert(result[2].name == 'file.txt') // IGroupedObservable.Next: DirEntry
    assert(result[3] == 'file.txt') // IGroupedObservable.Complete
    assert(result[4] == '.') // Complete
  })
  [Subscribe]()