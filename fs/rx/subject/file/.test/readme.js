require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var Do = require('@kingjs/rx.do')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var FileSubject = require('..')

var FileName = 'test.txt'

// get stats
var stats = fs.statSync(FileName)
var { ino } = stats

// create subject
var file = new FileSubject(ino)
assert(file.isFile)
assert(file.ino == ino)

// wait for timestamp changes 
var result
file[Subscribe](
  o => result = o,
  () => result = undefined
)

// push first stat through
file[Next](stats)
assert(result == stats)

// no change so no event
result = null
file[Next](stats)
assert(result == null)

// ensure replay of last stat
var behavior
file
  [Do](o => behavior = o)
  [Subscribe]()
assert(behavior.ino == ino)

fs.writeFileSync(FileName)
var stats = fs.statSync(FileName)
file[Next](stats)
assert(result == stats)

file[Complete]()
assert(result === undefined)