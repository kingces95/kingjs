var assert = require('assert')
var fs = require('fs')
var PathSubject = require('@kingjs/fs.rx.path-subject')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Complete } = require('@kingjs/rx.i-observer')
var Watch = require('..')

var FileName = 'temp'
var Dir = '.'

var result = [];

var subject = new PathSubject(Dir)
subject[Watch]()
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