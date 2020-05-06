require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var is = require('@kingjs/reflect.is')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Finalize = require('@kingjs/rx.finalize')
var SelectMany = require('@kingjs/rx.select-many')
var Do = require('@kingjs/rx.do')
var Log = require('@kingjs/rx.log')
var PathSubject = require('@kingjs/fs.rx.path-subject')
var StatsSubject = require('@kingjs/fs.rx.stats-subject')
var DistinctStats = require('..')

var TempFileName = 'file.txt'

var result = []

var subject = new PathSubject(TempFileName)
var stats = subject
  [DistinctStats]()
  [Do](o => assert(o instanceof StatsSubject))
  [Do](o => assert(is.number(o[Key])))
  [Do](
    () => result.push('LINK PATH'),
    () => result.push('COMPLETE')
  )
  [SelectMany](o => o
    [Do](o => assert(o.constructor.name == 'Stats'))
    [Do](
      () => result.push('CHANGE'),
      () => result.push('UNLINK PATH')
    )
  )
  [Subscribe](
    null,
    o => {
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
    }
  )

var t = 0
var dt = 100

setTimeout(() => {
  fs.writeFileSync(TempFileName)
  subject[Next]()                 // LINK PATH + CHANGE
}, t += dt)

setTimeout(() => {
  fs.writeFileSync(TempFileName)
  subject[Next]()                 // CHANGE
  subject[Next]()                 // nop
}, t += dt)

setTimeout(() => {
  fs.unlinkSync(TempFileName)
  fs.writeFileSync(TempFileName)
  subject[Next]()                 // UNLINK PATH + LINK PATH + CHANGE
}, t += dt)

setTimeout(() => {
  subject[Complete]()             // UNLINK PATH + COMPLETE
}, t += dt)