var assert = require('assert')
var fs = require('fs')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Complete } = require('@kingjs/rx.i-observer')
var WatchSubject = require('..')

var FileName = 'temp'
var Dir = '.'

var result = [];

var subject = new WatchSubject(Dir)
subject
  [Subscribe](
    () => result.push('next'),
    () => result.push('complete')
  )

setTimeout(() => {
  result.push('add')
  fs.writeFileSync(FileName)

  setTimeout(() => {
    result.push('remove')
    fs.unlinkSync(FileName)

    setTimeout(() => {
      result.push('stop')
      subject[Complete]()

      setTimeout(() => {
        assert.deepEqual(result, [
          'next', 
          'add', 
          'next', 
          'remove', 
          'next', 
          'stop', 
          'complete'
        ])   
      })
    }, 100)
  }, 100)
}, 100)