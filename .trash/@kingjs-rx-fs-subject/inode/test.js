require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var is = require('@kingjs/reflect.is')
var of = require('@kingjs/rx.of')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Finalize = require('@Kingjs/rx.finalize')
var Select = require('@Kingjs/rx.select')
var Tap = require('@Kingjs/rx.spy')
var Log = require('@Kingjs/rx.log')
var Subject = require('@Kingjs/rx.subject')
var DistinctStats = require('..')

var TempFileName = 'file.txt'

var result = []

var subject = new Subject()
var stats = subject
  [DistinctStats](TempFileName)

stats
  [Tap](
    // assert Key looks like a stats.ino
    o => {
      assert(is.number(o[Key]))
      assert(path.basename(o.path) == TempFileName)
    }
  )
  [Select](o => o
    [Subscribe](
      x => result.push('CHANGE'),
      () => result.push(
        `UNLINK PATH`
      )
    )
  )
  [Subscribe]()

stats
  [Tap](
    o => result.push(
      `LINK PATH`
    ),
    () => result.push('COMPLETE')
  )
  [Finalize](o => {
    fs.unlinkSync(TempFileName)
    assert.deepEqual(result, [ 
      'LINK PATH',
      'CHANGE',
      'CHANGE',
      'UNLINK PATH',
      'LINK PATH',
      'CHANGE',
      'UNLINK PATH',
      'COMPLETE' 
    ])
  })
  [Subscribe]()

var t = 0
var dt = 10

setTimeout(() => {
  fs.writeFileSync(TempFileName)
  subject[Next]()
}, t += dt)

setTimeout(() => {
  fs.writeFileSync(TempFileName)
  subject[Next]()
  subject[Next]()
}, t += dt)

setTimeout(() => {
  fs.unlinkSync(TempFileName)
  fs.writeFileSync(TempFileName)
  subject[Next]()
}, t += dt)

setTimeout(() => {
  subject[Complete]()
}, t += dt)