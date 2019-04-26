require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var of = require('@kingjs/rx.of')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Finalize = require('@Kingjs/rx.finalize')
var Select = require('@Kingjs/rx.select')
var Spy = require('@Kingjs/rx.spy')
var Log = require('@Kingjs/rx.log')
var Subject = require('@Kingjs/rx.subject')
var DistinctStats = require('..')

var TempFileName = 'file.txt';

var result = [];

var subject = new Subject();
var stats = subject
  [DistinctStats](TempFileName)

stats
  [Select](o => o
    [Subscribe](
      x => result.push('CHANGE'),
      () => result.push(
        `UNLINK PATH ${path.basename(o.path)}`
      )
    )
  )
  [Subscribe]()

stats
  [Spy](
    o => result.push(
      `LINK PATH ${path.basename(o.path)}`
    ),
    () => result.push('COMPLETE')
  )
  [Finalize](o => {
    fs.unlinkSync(TempFileName)
    assert.deepEqual(result, [ 
      'LINK PATH file.txt',
      'CHANGE',
      'CHANGE',
      'UNLINK PATH file.txt',
      'LINK PATH file.txt',
      'CHANGE',
      'UNLINK PATH file.txt',
      'COMPLETE' 
    ])
  })
  [Subscribe]()

var t = 0;
var dt = 10;

setTimeout(() => {
  fs.writeFileSync(TempFileName)
  subject[Next]()
}, t += dt);

setTimeout(() => {
  fs.writeFileSync(TempFileName)
  subject[Next]()
  subject[Next]()
}, t += dt);

setTimeout(() => {
  fs.unlinkSync(TempFileName)
  fs.writeFileSync(TempFileName)
  subject[Next]()
}, t += dt);

setTimeout(() => {
  subject[Complete]()
}, t += dt);